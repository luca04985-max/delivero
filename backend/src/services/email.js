import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const wrapHtml = (title, bodyHtml, preheader) => `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; background:#f6f8fa; margin:0; padding:0; }
      .container { max-width:600px; margin:28px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 20px rgba(16,24,40,0.06); }
      .header { background:#0b5fff; color:#fff; padding:20px; }
      .header h1 { margin:0; font-size:18px; }
      .content { padding:20px; color:#111827; }
      .button { display:inline-block; padding:12px 18px; background:#0b5fff; color:#fff; text-decoration:none; border-radius:6px; }
      .muted { color:#6b7280; font-size:13px; }
      .footer { padding:12px 20px; font-size:12px; color:#9ca3af; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header"><h1>${title}</h1></div>
      <div class="content">
        ${preheader ? `<p class="muted">${preheader}</p>` : ''}
        ${bodyHtml}
      </div>
      <div class="footer">Powered by Delivero — &copy; ${new Date().getFullYear()}</div>
    </div>
  </body>
  </html>
`;

const textFallback = (subject, bodyText, link) => `${subject}\n\n${bodyText}${link ? `\n\nLink: ${link}` : ''}\n\nTeam Delivero`;

export const sendOrderConfirmation = async (email, orderId, amount) => {
  const subject = `Ordine confermato #${orderId}`;
  const bodyHtml = `
    <p>Il tuo ordine <strong>#${orderId}</strong> è stato confermato.</p>
    <p><strong>Importo:</strong> €${amount}</p>
    <p>Puoi monitorare lo stato dell'ordine dalla tua area personale.</p>
  `;
  const html = wrapHtml(subject, bodyHtml, 'Il tuo ordine è stato confermato');
  const text = textFallback(subject, `Il tuo ordine #${orderId} è stato confermato. Importo: €${amount}`);

  const mailOptions = { from: process.env.EMAIL_USER, to: email, subject, html, text };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    throw error;
  }
};

export const sendBillReminder = async (email, billType, dueDate, amount) => {
  const subject = `Promemoria pagamento - ${billType}`;
  const bodyHtml = `
    <p>La tua bolletta <strong>${billType}</strong> scade il <strong>${dueDate}</strong>.</p>
    <p><strong>Importo:</strong> €${amount}</p>
    <p>Effettua il pagamento per evitare interruzioni del servizio.</p>
  `;
  const html = wrapHtml(subject, bodyHtml, 'Promemoria pagamento');
  const text = textFallback(subject, `La tua bolletta ${billType} scade il ${dueDate}. Importo: €${amount}`);

  const mailOptions = { from: process.env.EMAIL_USER, to: email, subject, html, text };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending bill reminder:', error);
    throw error;
  }
};

export const sendPasswordReset = async (email, resetLink) => {
  const subject = 'Ripristina la tua password - Delivero';
  const bodyHtml = `
    <p>Hai richiesto il ripristino della password per il tuo account Delivero.</p>
    <p>Per impostare una nuova password clicca il pulsante qui sotto. Il link è valido per 1 ora.</p>
    <p><a class="button" href="${resetLink}">Imposta nuova password</a></p>
    <p class="muted">Se non hai richiesto questo reset, ignora questa email.</p>
  `;
  const html = wrapHtml('Ripristina la tua password', bodyHtml, 'Imposta una nuova password per il tuo account');
  const text = textFallback(subject, 'Hai richiesto il ripristino della password. Usa il link per impostare una nuova password.', resetLink);

  const mailOptions = { from: process.env.EMAIL_USER, to: email, subject, html, text };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset:', error);
    throw error;
  }
};

export const sendEmail = async (email, subject, htmlContent, plainText) => {
  const html = wrapHtml(subject, htmlContent, '');
  const text = plainText || textFallback(subject, (htmlContent || '').replace(/<[^>]+>/g, ''));
  const mailOptions = { from: process.env.EMAIL_USER, to: email, subject, html, text };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendRestaurantOnboarding = async (email, ownerName, restaurantName, webLink, mobileLink) => {
  const subject = 'Benvenuto su Delivero — accesso ristorante';
  const logo = process.env.EMAIL_LOGO_URL || 'https://delivero.app/assets/logo.png';
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@delivero.com';

  const bodyHtml = `
    <div style="text-align:center;margin-bottom:12px;">
      <img src="${logo}" alt="Delivero" style="max-height:48px;" />
    </div>
    <h2>Ciao ${ownerName}, benvenuto su Delivero!</h2>
    <p>Il tuo account per il ristorante <strong>${restaurantName}</strong> è stato creato dall'amministratore.</p>
    <ol>
      <li>Clicca sul pulsante qui sotto per impostare la tua password (valido 1 ora).</li>
      <li>Accedi alla dashboard ristorante per configurare orari, menu e consegne.</li>
      <li>Se hai bisogno di assistenza contatta <a href="mailto:${supportEmail}">${supportEmail}</a>.</li>
    </ol>
    <p style="text-align:center;margin:18px 0;"><a class="button" href="${webLink}">Imposta la password</a></p>
    <p style="text-align:center">Oppure apri l'app mobile e usa questo link:<br/><a href="${mobileLink}">${mobileLink}</a></p>
    <hr />
    <p class="muted">Consigli: dopo il primo accesso, aggiorna subito la password e completa le informazioni del ristorante.</p>
  `;

  const html = wrapHtml('Benvenuto su Delivero', bodyHtml, `Account creato per ${restaurantName}`);
  const text = textFallback(subject, `Ciao ${ownerName}, il tuo account ristorante ${restaurantName} è stato creato. Usa il link per impostare la password: ${webLink}`, webLink);

  const mailOptions = { from: process.env.EMAIL_USER, to: email, subject, html, text };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending restaurant onboarding email:', error);
    throw error;
  }
};

export const renderRestaurantOnboardingHtml = (ownerName, restaurantName, webLink, mobileLink) => {
  const logo = process.env.EMAIL_LOGO_URL || 'https://delivero.app/assets/logo.png';
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@delivero.com';

  const bodyHtml = `
    <div style="text-align:center;margin-bottom:12px;">
      <img src="${logo}" alt="Delivero" style="max-height:48px;" />
    </div>
    <h2>Ciao ${ownerName}, benvenuto su Delivero!</h2>
    <p>Il tuo account per il ristorante <strong>${restaurantName}</strong> è stato creato dall'amministratore.</p>
    <ol>
      <li>Clicca sul pulsante qui sotto per impostare la tua password (valido 1 ora).</li>
      <li>Accedi alla dashboard ristorante per configurare orari, menu e consegne.</li>
      <li>Se hai bisogno di assistenza contatta <a href="mailto:${supportEmail}">${supportEmail}</a>.</li>
    </ol>
    <p style="text-align:center;margin:18px 0;"><a class="button" href="${webLink}">Imposta la password</a></p>
    <p style="text-align:center">Oppure apri l'app mobile e usa questo link:<br/><a href="${mobileLink}">${mobileLink}</a></p>
    <hr />
    <p class="muted">Consigli: dopo il primo accesso, aggiorna subito la password e completa le informazioni del ristorante.</p>
  `;

  return wrapHtml('Benvenuto su Delivero', bodyHtml, `Account creato per ${restaurantName}`);
};

export const renderPasswordResetHtml = (resetLink) => {
  const bodyHtml = `
    <p>Hai richiesto il ripristino della password per il tuo account Delivero.</p>
    <p>Per impostare una nuova password clicca il pulsante qui sotto. Il link è valido per 1 ora.</p>
    <p style="text-align:center;margin:18px 0;"><a class="button" href="${resetLink}">Imposta nuova password</a></p>
    <p class="muted">Se non hai richiesto questo reset, ignora questa email.</p>
  `;

  return wrapHtml('Ripristina la tua password', bodyHtml, 'Imposta una nuova password per il tuo account');
};

export const renderOrderConfirmationHtml = (orderId, amount) => {
  const bodyHtml = `
    <p>Il tuo ordine <strong>#${orderId}</strong> è stato confermato.</p>
    <p><strong>Importo:</strong> €${amount}</p>
    <p>Puoi monitorare lo stato dell'ordine dalla tua area personale.</p>
  `;

  return wrapHtml(`Ordine confermato #${orderId}`, bodyHtml, 'Il tuo ordine è stato confermato');
};
