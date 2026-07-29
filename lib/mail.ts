import nodemailer from "nodemailer";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

export function getMailConfig() {
  return {
    host: requiredEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT || "465"),
    secure: (process.env.SMTP_SECURE || "true") === "true",
    user: requiredEnv("SMTP_USER"),
    pass: requiredEnv("SMTP_PASS"),
    from: process.env.SMTP_FROM || requiredEnv("SMTP_USER"),
    to: process.env.CONTACT_TO_EMAIL || requiredEnv("SMTP_USER"),
  };
}

export async function sendBusinessEmail(options: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const config = getMailConfig();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"SM Nettoyage Website" <${config.from}>`,
    to: config.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
