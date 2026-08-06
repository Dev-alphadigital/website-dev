"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

// Posts a form's data (including any <input type="file">) to the shared
// /api/contact route as multipart/form-data, so attachments ride along
// automatically -- no separate JSON vs. file-upload code paths needed.
export function useFormSubmit(formName: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(form: HTMLFormElement) {
    setStatus("submitting");
    setError(null);

    const formData = new FormData(form);
    formData.set("formName", formName);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return { status, error, submit };
}
