# SM Nettoyage — smnettoyage.ch

## Local development (instant preview)

```bash
npm install
cp .env.example .env.local   # then fill SMTP values
npm run dev
```

Open **http://localhost:3000** — default language is French (`/fr`).

## Forms / email (required for Hostinger Node)

Contact and booking forms send email via **Nodemailer + SMTP**.

1. Copy `.env.example` → `.env.local` (local) or set the same vars in Hostinger
2. Use your mailbox SMTP (Hostinger example):

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@smnettoyage.ch
SMTP_PASS=...
CONTACT_TO_EMAIL=info@smnettoyage.ch
```

## Deploy on Hostinger (Node.js app)

Forms need a **Node.js** host (not static File Manager upload).

```bash
npm run build
npm start
```

Set the SMTP environment variables in the Hostinger panel.

## Contact details

- Address: Rue des Agas, 1635 La Tour-de-Trême, Switzerland  
- Phone: +41 78 230 79 54  
- Email: info@smnettoyage.ch
