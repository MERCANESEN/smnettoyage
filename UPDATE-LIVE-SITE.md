# Update smnettoyage.ch with the LATEST website

Your domain still shows the **old** upload.  
Upload this new package to replace it.

## File on your Desktop

`smnettoyage-LATEST-public_html.zip`

## Steps in Hostinger (File Manager)

1. Log in to hPanel → **Files → File Manager**
2. Open **`public_html`** (the folder for smnettoyage.ch)
3. **Select all** old files/folders inside `public_html` → **Delete**
   (or move them to a backup folder first)
4. Upload **`smnettoyage-LATEST-public_html.zip`**
5. **Extract** the zip **inside** `public_html`
6. Make sure you see folders like `fr`, `de`, `en`, `it`, `_next` directly in `public_html`
   (not inside an extra nested folder)
7. Delete the zip from `public_html` after extract
8. Open **https://smnettoyage.ch/fr** and hard-refresh: `Ctrl + F5`

## What you should see after upload

- New address: Rue des Agas, 1635 La Tour-de-Trême
- Phone: +41 78 230 79 54
- No “Join Us” / “Nous rejoindre” in the menu
- Mobile language **dropdown**
- Language suggestion banner (if browser language is not French)

## Note about forms

This File Manager upload is static (same hosting style as now).  
Forms will open your email app (mailto) if the server API is not available.  
For automatic email sending without mailto, you need Hostinger **Node.js Web App** later.
