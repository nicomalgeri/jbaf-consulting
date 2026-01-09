import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// Gmail API configuration using OAuth2
const OAuth2 = google.auth.OAuth2;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: EmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    // Create OAuth2 client
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground' // Redirect URL
    );

    // Set credentials with refresh token
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    // Get access token
    const accessToken = await oauth2Client.getAccessToken();

    // Create transporter with OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER || 'joseph@jbafconsult.com',
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token || '',
      },
    });

    // Send email
    const mailOptions = {
      from: `JBAF Consulting <${process.env.GMAIL_USER || 'joseph@jbafconsult.com'}>`,
      to,
      subject,
      html,
      replyTo,
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
