import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactFormSchema } from '@/lib/validations';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_THRESHOLD = 0.5;
const SITE_URL = 'https://jbafconsult.com';
const LOGO_URL = 'https://jbafconsulting.vercel.app/_next/image?url=%2FLogo.png&w=384&q=75';

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA secret key not configured, skipping verification');
    return { success: true };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return {
      success: data.success && data.score >= RECAPTCHA_THRESHOLD,
      score: data.score,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false };
  }
}

function getServiceLabel(serviceKey: string): string {
  const services: Record<string, string> = {
    'strategic-delivery': 'Strategic Delivery & Operational Support',
    'leadership-development': 'Leadership & Team Development Solutions',
    'staffing': 'Staffing',
    'digital-transformation': 'Digital Transformation & Insights',
    'corporate-communication': 'Corporate Communication & Stakeholder Engagement',
    'general': 'General Inquiry',
  };
  return services[serviceKey] || serviceKey;
}

async function getAccessToken(): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID!,
      client_secret: process.env.GMAIL_CLIENT_SECRET!,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Failed to get access token: ${data.error_description || data.error}`);
  }
  return data.access_token;
}

async function createTransporter() {
  const accessToken = await getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
}

function generateConfirmationHTML(name: string, serviceInterest: string, message: string): string {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Thank You - JBAF Consulting</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Manrope', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 40px 20px;">

            <!-- Main Container -->
            <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">

              <!-- Header with Logo -->
              <tr>
                <td style="background-color: #ffffff; padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
                  <img src="${LOGO_URL}" alt="JBAF Consulting" width="180" style="display: block; margin: 0 auto; max-width: 180px; height: auto;">
                </td>
              </tr>

              <!-- Success Banner -->
              <tr>
                <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 25px 40px; text-align: center;">
                  <table cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;">
                    <tr>
                      <td style="width: 50px; height: 50px; background-color: rgba(255,255,255,0.2); border-radius: 50%; text-align: center; vertical-align: middle;">
                        <span style="color: #ffffff; font-size: 24px; line-height: 50px;">&#10003;</span>
                      </td>
                    </tr>
                  </table>
                  <h1 style="color: #ffffff; margin: 15px 0 0; font-size: 22px; font-weight: 600;">
                    Message Received
                  </h1>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 40px;">
                  <p style="color: #1e293b; line-height: 1.7; margin: 0 0 20px; font-size: 16px;">
                    Dear <strong>${name}</strong>,
                  </p>

                  <p style="color: #475569; line-height: 1.7; margin: 0 0 20px; font-size: 15px;">
                    Thank you for contacting JBAF Consulting. We have received your inquiry and truly appreciate your interest in partnering with us.
                  </p>

                  <p style="color: #475569; line-height: 1.7; margin: 0 0 30px; font-size: 15px;">
                    Our team is reviewing your message and will respond within <strong style="color: #1e293b;">24 business hours</strong>.
                  </p>

                  <!-- Inquiry Summary Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                          Your Inquiry Summary
                        </h3>

                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                              <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Date</span><br>
                              <span style="color: #1e293b; font-size: 15px; font-weight: 500;">${currentDate}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                              <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Service of Interest</span><br>
                              <span style="color: #1e293b; font-size: 15px; font-weight: 500;">${getServiceLabel(serviceInterest)}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</span><br>
                              <span style="color: #475569; font-size: 14px; line-height: 1.6; display: block; margin-top: 8px; padding: 15px; background-color: #ffffff; border-radius: 8px; border-left: 3px solid #3b82f6;">${message.substring(0, 250)}${message.length > 250 ? '...' : ''}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- CTA Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <a href="${SITE_URL}" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px;">
                          Visit Our Website
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="color: #475569; line-height: 1.7; margin: 0; font-size: 15px;">
                    Warm regards,
                  </p>
                  <p style="color: #1e293b; line-height: 1.5; margin: 8px 0 0; font-size: 15px; font-weight: 600;">
                    The JBAF Consulting Team
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="text-align: center; padding-bottom: 15px;">
                        <a href="${SITE_URL}" style="color: #64748b; text-decoration: none; font-size: 13px; margin: 0 10px;">Website</a>
                        <span style="color: #cbd5e1;">|</span>
                        <a href="${SITE_URL}/services" style="color: #64748b; text-decoration: none; font-size: 13px; margin: 0 10px;">Services</a>
                        <span style="color: #cbd5e1;">|</span>
                        <a href="${SITE_URL}/contact" style="color: #64748b; text-decoration: none; font-size: 13px; margin: 0 10px;">Contact</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: center; padding-bottom: 10px;">
                        <p style="color: #64748b; font-size: 13px; margin: 0; line-height: 1.6;">
                          JBAF Consulting<br>
                          Ware, Hertfordshire, United Kingdom
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: center; padding-bottom: 15px;">
                        <a href="mailto:info@jbafconsult.com" style="color: #3b82f6; text-decoration: none; font-size: 13px;">info@jbafconsult.com</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                        <p style="color: #94a3b8; font-size: 11px; margin: 0; line-height: 1.6;">
                          This email was sent in response to your inquiry submitted on our website.<br>
                          &copy; ${new Date().getFullYear()} JBAF Consulting. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function generateAdminNotificationHTML(data: {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}): string {
  const currentDate = new Date().toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>New Lead - JBAF Consulting</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Manrope', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 40px 20px;">

            <!-- Main Container -->
            <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">

              <!-- Header with Logo -->
              <tr>
                <td style="background-color: #ffffff; padding: 35px 40px 25px; text-align: center; border-bottom: 1px solid #e2e8f0;">
                  <img src="${LOGO_URL}" alt="JBAF Consulting" width="160" style="display: block; margin: 0 auto; max-width: 160px; height: auto;">
                </td>
              </tr>

              <!-- Alert Banner -->
              <tr>
                <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 20px 40px; text-align: center;">
                  <span style="color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
                    New Lead Received
                  </span>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 35px 40px;">

                  <!-- Timestamp -->
                  <p style="color: #64748b; font-size: 13px; margin: 0 0 25px; text-align: center;">
                    ${currentDate}
                  </p>

                  <!-- Contact Details Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                          Contact Details
                        </h3>

                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="100" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Name</td>
                                  <td style="color: #1e293b; font-size: 15px; font-weight: 600;">${data.name}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="100" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Email</td>
                                  <td><a href="mailto:${data.email}" style="color: #3b82f6; font-size: 15px; text-decoration: none;">${data.email}</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="100" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Phone</td>
                                  <td><a href="tel:${data.phone}" style="color: #3b82f6; font-size: 15px; text-decoration: none;">${data.phone}</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="100" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Service</td>
                                  <td>
                                    <span style="display: inline-block; padding: 5px 12px; background-color: #dbeafe; color: #1d4ed8; font-size: 13px; font-weight: 600; border-radius: 6px;">
                                      ${getServiceLabel(data.serviceInterest)}
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Message Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                          Message
                        </h3>
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 3px solid #3b82f6;">
                          <p style="color: #475569; line-height: 1.7; margin: 0; font-size: 15px; white-space: pre-wrap;">${data.message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Action Buttons -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding-right: 10px;">
                              <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px;">
                                Reply to ${data.name.split(' ')[0]}
                              </a>
                            </td>
                            <td>
                              <a href="tel:${data.phone}" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #3b82f6; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px; border: 2px solid #3b82f6;">
                                Call Now
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="text-align: center;">
                        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                          Automated notification from JBAF Consulting website<br>
                          &copy; ${new Date().getFullYear()} JBAF Consulting
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify reCAPTCHA token
    if (body.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Validate the request body (excluding recaptchaToken for validation)
    const { recaptchaToken, ...formData } = body;
    const validatedData = contactFormSchema.parse(formData);

    // Check if Gmail OAuth credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
      console.error('Gmail OAuth credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly.' },
        { status: 500 }
      );
    }

    const transporter = await createTransporter();
    const emailTo = process.env.EMAIL_TO || ['info@jbafconsult.com', 'joseph@jbafconsult.com'];

    // Send notification email to admin
    await transporter.sendMail({
      from: `"JBAF Consulting" <${process.env.GMAIL_USER}>`,
      to: emailTo,
      replyTo: validatedData.email,
      subject: `New Lead: ${validatedData.name} - ${getServiceLabel(validatedData.serviceInterest)}`,
      html: generateAdminNotificationHTML(validatedData),
    });

    // Send confirmation email to the user
    try {
      await transporter.sendMail({
        from: `"JBAF Consulting" <${process.env.GMAIL_USER}>`,
        to: validatedData.email,
        subject: 'Thank You for Contacting JBAF Consulting',
        html: generateConfirmationHTML(
          validatedData.name,
          validatedData.serviceInterest,
          validatedData.message
        ),
      });
    } catch (confirmationError) {
      console.error('Error sending confirmation email:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
