import { NextRequest, NextResponse } from "next/server";
import { sendFormEmail, type MailAttachment, type MailField } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_ATTACHMENT_BYTES = 25 * 1024 * 1024; // 25MB combined, typical SMTP relay ceiling

// Shared endpoint for every form on the site (lead form, contact form, the
// standalone /contact page). Accepts multipart/form-data so it can carry
// file attachments; any field that isn't literally "formName" or a File is
// treated as a labeled text field and included in the email body as-is.
export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const formName = (formData.get("formName") as string) || "Website";
  const fields: MailField[] = [];
  const attachments: MailAttachment[] = [];
  let totalAttachmentBytes = 0;
  let replyTo: string | undefined;

  for (const [key, value] of formData.entries()) {
    if (key === "formName") continue;

    if (value instanceof File) {
      if (value.size === 0) continue;
      if (value.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json({ error: `"${value.name}" is larger than the 10MB limit per file.` }, { status: 413 });
      }
      totalAttachmentBytes += value.size;
      if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return NextResponse.json({ error: "Attachments are too large combined (25MB max)." }, { status: 413 });
      }
      const buffer = Buffer.from(await value.arrayBuffer());
      attachments.push({ filename: value.name, content: buffer, contentType: value.type || undefined });
      continue;
    }

    fields.push({ label: key, value: String(value) });
    if (key.toLowerCase().includes("email") && !replyTo) {
      replyTo = String(value);
    }
  }

  if (fields.length === 0 && attachments.length === 0) {
    return NextResponse.json({ error: "The form was empty." }, { status: 400 });
  }

  try {
    await sendFormEmail({ formName, fields, attachments, replyTo });
  } catch (error) {
    console.error("Failed to send form email:", error);
    const message = error instanceof Error ? error.message : "Failed to send your submission. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
