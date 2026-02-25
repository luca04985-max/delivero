const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STYLE_CONST_PATH = path.join(ROOT, 'mobile', 'theme', 'StyleConstants.js');

const TARGET_GLOB = path.join(ROOT, 'mobile', 'screens');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) walk(fp, filelist);
    else if (/styles[\\/].+\.js$/.test(fp)) filelist.push(fp);
  });
  return filelist;
}

function relImport(fromFile) {
  const rel = path.relative(path.dirname(fromFile), STYLE_CONST_PATH).replace(/\\/g, '/');
  return rel.startsWith('.') ? rel : './' + rel;
}

function transformContent(filePath, baseSpace = 8) {
  let src = fs.readFileSync(filePath, 'utf8');

  // If already imports StyleConstants, skip import injection
  if (!/StyleConstants/.test(src)) {
    // Insert import after last import or at top
    const importLine = `import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '${relImport(filePath)}';\n`;
    const lastImportMatch = src.match(/(?:^|\n)(import .*?;)(?![\s\S]*import)/);
    if (lastImportMatch) {
      const idx = src.lastIndexOf(lastImportMatch[1]) + lastImportMatch[1].length;
      src = src.slice(0, idx) + '\n' + importLine + src.slice(idx);
    } else {
      src = importLine + src;
    }
  }

  // properties to normalize
  const spacingProps = [
    'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginVertical', 'marginHorizontal',
    'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingVertical', 'paddingHorizontal',
    'borderRadius'
  ];
  const fontProps = ['fontSize', 'lineHeight'];

  spacingProps.forEach((prop) => {
    const re = new RegExp(`(\\b${prop}\\s*:\\s*)([0-9]+)(\\s*[,)])`, 'g');
    src = src.replace(re, (m, p1, num, p3) => {
      const multiplier = (Number(num) / baseSpace).toFixed(3).replace(/\.000$/, '');
      return `${p1}BASE_SPACE * ${multiplier}${p3}`;
    });
  });

  fontProps.forEach((prop) => {
    const re = new RegExp(`(\\b${prop}\\s*:\\s*)([0-9]+)(\\s*[,)])`, 'g');
    src = src.replace(re, (m, p1, num, p3) => {
      const multiplier = (Number(num) / 16).toFixed(3).replace(/\.000$/, '');
      return `${p1}FONT_SIZE_BASE * ${multiplier}${p3}`;
    });
  });

  // write backup then new file
  fs.writeFileSync(filePath + '.bak', fs.readFileSync(filePath, 'utf8'));
  fs.writeFileSync(filePath, src, 'utf8');
}

function main() {
  console.log('Scanning style files...');
  const files = walk(TARGET_GLOB);
  console.log('Found', files.length, 'style files.');
  files.forEach((f) => {
    try {
      transformContent(f);
      console.log('Normalized', path.relative(ROOT, f));
    } catch (err) {
      console.error('Error processing', f, err.message);
    }
  });
  console.log('Normalization complete. Backups saved with .bak extension.');
}

if (require.main === module) main();
