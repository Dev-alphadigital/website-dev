import nodemailer from "nodemailer";

const DEFAULT_TO = "contact.us@alphadigital.live";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type MailField = { label: string; value: string };

interface SendFormEmailOptions {
  /** Short label for the email subject, e.g. "Marketing Audit Request" */
  formName: string;
  fields: MailField[];
  attachments?: MailAttachment[];
  /** Reply-to address, if the submitter gave one (usually their "Email" field) */
  replyTo?: string;
}

// Requires SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS (and optionally
// MAIL_FROM / MAIL_TO) to be set -- see .env.example. Without them, this
// throws a descriptive error rather than silently pretending to send.
export async function sendFormEmail({ formName, fields, attachments, replyTo }: SendFormEmailOptions) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured: set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS (see .env.example)."
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const textBody = fields.map((f) => `${f.label}: ${f.value || "-"}`).join("\n");
  const htmlBody = `<table cellpadding="6">${fields
    .map((f) => `<tr><td><strong>${escapeHtml(f.label)}</strong></td><td>${escapeHtml(f.value || "-")}</td></tr>`)
    .join("")}</table>`;

  await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to: MAIL_TO || DEFAULT_TO,
    replyTo,
    subject: `New ${formName} submission - alphadigital.live`,
    text: textBody,
    html: htmlBody,
    attachments,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
