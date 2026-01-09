import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    encoding?: string;
  }>;
}

export async function sendEmail({ to, subject, html, replyTo, attachments }: EmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    // Create transporter using Gmail SMTP with App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // App Password, not regular password
      },
    });

    // Send email
    const mailOptions: nodemailer.SendMailOptions = {
      from: `JBAF Consulting <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      replyTo,
      attachments,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);

    return { success: true };
  } catch (error) {
    console.error('Error sending email via Gmail:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error sending email'
    };
  }
}

// Verify reCAPTCHA token
export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured');
    return { success: true }; // Allow in development without reCAPTCHA
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      return { success: true, score: data.score };
    } else {
      return {
        success: false,
        score: data.score,
        error: 'reCAPTCHA verification failed'
      };
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Failed to verify reCAPTCHA' };
  }
}
