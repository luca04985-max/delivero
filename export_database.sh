#!/usr/bin/env bash
set -euo pipefail

# ========================================
# CONFIGURA QUI
# ========================================
CONN_STRING="postgres://user:password@localhost:5432/delivero_db" # sostituisci con la tua connection string
OUTPUT_FILE="/tmp/all_tables.json"
BUCKET_NAME="tmp-exports" # nome del bucket (verrà creato se mancante)
OBJECT_NAME="exports/$(date +%Y%m%d_%H%M%S)_all_tables.json"
SUPABASE_URL="https://your-project.supabase.co" # sostituisci con il tuo SUPABASE_URL
SERVICE_ROLE_KEY="eyJhbGciOi..." # sostituisci con la tua SERVICE_ROLE_KEY
SIGN_EXPIRES=3600 # durata del signed URL in secondi (default 1 ora)

# ========================================
# EXPORT DB -> JSON
# ========================================
echo "== Export DB -> JSON =="
echo "Using connection string: ${CONN_STRING/:*/:***}" # non stampa la password ma mostra che è stato impostato

# Funzione per esportare tutte le tabelle
export_tables() {
    echo "Exporting tables to JSON..."
    
    # Crea una funzione temporanea per esportare tutte le tabelle
    psql "$CONN_STRING" << 'EOF' > "$OUTPUT_FILE"
CREATE OR REPLACE FUNCTION dump_all_tables_as_json()
RETURNS JSONB AS $$
DECLARE
    result JSONB := '{}'::JSONB;
    table_rec RECORD;
    table_data JSONB;
BEGIN
    FOR table_rec IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
    LOOP
        EXECUTE format('SELECT jsonb_agg(row_to_json(t)) FROM %I t', table_rec.table_name) INTO table_data;
        result := result || jsonb_build_object(table_rec.table_name, COALESCE(table_data, '[]'::JSONB));
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

SELECT jsonb_pretty(dump_all_tables_as_json());
DROP FUNCTION dump_all_tables_as_json();
EOF
}

# Esegui l'esportazione
export_tables

FILE_SIZE=$(stat -c%s "$OUTPUT_FILE" 2>/dev/null || stat -f%z "$OUTPUT_FILE")
echo "Saved to $OUTPUT_FILE (size: $FILE_SIZE bytes)"

# ========================================
# ENSURE BUCKET EXISTS
# ========================================
echo
echo "== Ensure bucket exists =="

# Check bucket existence
RES=$(curl -s -o /tmp/bucket_check.json -w "%{http_code}" \
    -X GET "$SUPABASE_URL/storage/v1/bucket/$BUCKET_NAME" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY")

HTTP_CODE=$(cat /tmp/bucket_check.json >/dev/null; echo "$RES")

# The Supabase storage GET returns 200 if exists, 404 if not (and a JSON error)
if [ "$RES" -ne 200 ]; then
    echo "Bucket not found or inaccessible (status $RES). Creating bucket..."
    CREATE_RES=$(curl -s \
        -X POST "$SUPABASE_URL/storage/v1/buckets" \
        -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$BUCKET_NAME\",\"public\":false,\"file_size_limit\":524288000}")
    echo "Create bucket response: $CREATE_RES"
else
    echo "Bucket exists (status $RES)."
fi

# ========================================
# UPLOAD FILE
# ========================================
echo
echo "== Uploading file =="
UPLOAD_RESP=$(curl -s \
    -X POST "$SUPABASE_URL/storage/v1/object/$BUCKET_NAME/$OBJECT_NAME" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: multipart/form-data" \
    -F "file=@${OUTPUT_FILE}")

echo "Upload response: $UPLOAD_RESP"

# Try to extract a useful field — Supabase returns object metadata
if echo "$UPLOAD_RESP" | jq -e .name >/dev/null 2>&1; then
    echo "Uploaded object name: $(echo "$UPLOAD_RESP" | jq -r .name)"
elif echo "$UPLOAD_RESP" | jq -e .message >/dev/null 2>&1; then
    echo "Server message: $(echo "$UPLOAD_RESP" | jq -r .message)"
fi

# ========================================
# GENERATE SIGNED URL
# ========================================
echo
echo "== Generating signed URL (expires in $SIGN_EXPIRES seconds) =="
SIGNED=$(curl -s \
    -X POST "$SUPABASE_URL/storage/v1/object/sign/$BUCKET_NAME/$OBJECT_NAME" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"expiresIn\": $SIGN_EXPIRES}")

SIGNED_URL=$(echo "$SIGNED" | jq -r '.signedURL // .signed_url // empty')

if [ -z "$SIGNED_URL" ]; then
    echo "Failed to obtain signed URL. Full response:"
    echo "$SIGNED"
    exit 1
fi

echo "Signed URL (valid for $SIGN_EXPIRES seconds):"
echo "$SIGNED_URL"

# ========================================
# CLEANUP LOCAL FILE
# ========================================
echo
echo "== Cleanup local file =="
# Uncomment next line to remove local file after upload
# rm -f "$OUTPUT_FILE"
echo "Local file kept at $OUTPUT_FILE (comment/uncomment rm in script to change)."

# ========================================
# VERIFICATION
# ========================================
echo
echo "== Verification =="
echo "✅ Database exported successfully"
echo "✅ File uploaded to Supabase Storage"
echo "✅ Signed URL generated"
echo "✅ Ready for testing!"

# Mostra informazioni sul file
echo
echo "File Information:"
echo "- Path: $OUTPUT_FILE"
echo "- Size: $(numfmt --to=iec $FILE_SIZE)"
echo "- Upload path: $BUCKET_NAME/$OBJECT_NAME"
echo "- Signed URL expires: $(date -d "+$SIGN_EXPIRES seconds" 2>/dev/null || date -v+${SIGN_EXPIRES}S)"

# Test del signed URL (opzionale)
echo
echo "Testing signed URL (first 1KB):"
if command -v curl >/dev/null 2>&1; then
    curl -s -r 0-1023 "$SIGNED_URL" | head -c 100 | jq . 2>/dev/null || echo "URL is valid but content may be large"
else
    echo "curl not available for testing"
fi

echo
echo "🎉 Export completed successfully!"
echo "📋 Use the signed URL above to download the data"
echo "🔄 Run this script again to create a fresh export"
