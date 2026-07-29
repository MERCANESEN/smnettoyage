# Deploy SM Nettoyage to smnettoyage.ch (Hostinger)

This site needs **Node.js Web App** hosting (forms use `/api`).  
Plain File Manager / PHP hosting will not run it correctly.

## Before you start

1. Hostinger plan must support **Node.js Web App** (Business or Cloud).
2. Domain `smnettoyage.ch` ready in hPanel.
3. Mailbox `info@smnettoyage.ch` exists (for SMTP forms).

## Deploy with ZIP (easiest)

1. Use the file **`sm-nettoyage-deploy.zip`** on your Desktop (created for you).
2. Log in to **[hPanel](https://hpanel.hostinger.com)**.
3. Go to **Websites → Add website → Node.js Web App** (or **Deploy Web App**).
   - If `smnettoyage.ch` is already attached to an old website, remove/replace that website first (download a backup if needed), then add Node.js again on that domain.
4. Choose **Upload ZIP** and upload `sm-nettoyage-deploy.zip`.
5. Confirm settings roughly like:
   - **Framework:** Next.js (auto-detected)
   - **Node version:** 20 or 22
   - **Install:** `npm install`
   - **Build:** `npm run build`
   - **Start:** `npm run start`
6. Add **Environment variables** (same as your `.env.local`):

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@smnettoyage.ch
SMTP_PASS=YOUR_EMAIL_PASSWORD
SMTP_FROM=info@smnettoyage.ch
CONTACT_TO_EMAIL=info@smnettoyage.ch
NODE_ENV=production
```

7. Click **Deploy** and wait until it finishes.
8. Open **https://smnettoyage.ch** (and `/fr`).

## After deploy

- Test Contact and Booking forms (you should receive emails).
- If email fails, try `SMTP_PORT=587` and `SMTP_SECURE=false` in Hostinger env vars, then restart the app.

## Later updates

Rebuild a new ZIP from this project (or connect GitHub for auto-deploy), upload again, and redeploy.
