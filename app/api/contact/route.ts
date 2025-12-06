// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // ensure Node.js runtime

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_FROM ||
      !process.env.CONTACT_TO
    ) {
      console.error('Missing SMTP/CONTACT env vars');
      return NextResponse.json(
        { ok: false, error: 'Server email configuration is incomplete.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1) Email to you (owner)
    const ownerText = `
New message from your portfolio contact form.

From: ${name} <${email}>
Subject: ${subject}

Message:
${message}
    `.trim();

    const ownerHtml = `
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 16px; background-color: #020617; color: #e5e7eb;">
  <h2 style="margin: 0 0 12px; font-size: 18px; color: #22d3ee;">New portfolio contact</h2>
  <p style="margin: 0 0 4px;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
  <p style="margin: 0 0 4px;"><strong>Subject:</strong> ${subject}</p>
  <hr style="border: none; border-top: 1px solid #1f2937; margin: 12px 0;" />
  <p style="margin: 0 0 8px; white-space: pre-line;">${message}</p>
</div>
    `.trim();

    const ownerMail = {
      from: `"Ishan Gupta Portfolio" <${process.env.CONTACT_FROM}>`,
      to: process.env.CONTACT_TO,
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      text: ownerText,
      html: ownerHtml,
    };

    await transporter.sendMail(ownerMail);

    // 2) Confirmation email to the user
    const userText = `
Hi ${name},

Thanks for reaching out via my portfolio website. Here's a copy of what you sent:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

If you notice anything missing or want to add more details,
just reply to this email and I'll see your updated information.

Best,
Ishan Gupta
    `.trim();

    const userHtml = `
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 16px; background-color: #020617; color: #e5e7eb;">
  <h2 style="margin: 0 0 12px; font-size: 18px; color: #22d3ee;">Thanks for reaching out ✉️</h2>
  <p style="margin: 0 0 8px;">Hi ${name},</p>
  <p style="margin: 0 0 8px;">
    Thanks for contacting me via my portfolio website. Here&apos;s a copy of the details you submitted:
  </p>
  <div style="margin: 12px 0; padding: 12px; background-color: #020617; border-radius: 8px; border: 1px solid #1f2937;">
    <p style="margin: 0 0 4px;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 0 0 4px;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 0 0 4px;"><strong>Subject:</strong> ${subject}</p>
    <p style="margin: 8px 0 0;"><strong>Message:</strong></p>
    <p style="margin: 4px 0 0; white-space: pre-line;">${message}</p>
  </div>
  <p style="margin: 12px 0 4px;">
    If you notice anything missing or want to add more details, simply reply to this email and I&apos;ll see your updated information.
  </p>
  <p style="margin: 4px 0 0;">Best,<br />Ishan Gupta</p>
</div>
    `.trim();

    const userMail = {
      from: `"Ishan Gupta" <${process.env.CONTACT_FROM}>`,
      to: email,
      subject: `Your message to Ishan Gupta: ${subject}`,
      text: userText,
      html: userHtml,
    };

    await transporter.sendMail(userMail);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}