import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  const { to, subject, message } = await req.json();
  try {
    const data = await resend.emails.send({
      from: "Community Tracker <noreply@yourdomain.com>",
      to,
      subject,
      html: `<p>${message}</p>`,
    });
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
});