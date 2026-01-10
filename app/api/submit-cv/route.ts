import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { cvSubmissionSchema } from '@/lib/validations';

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

function generateApplicantConfirmationHTML(name: string): string {
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
      <title>Application Received - JBAF Consulting</title>
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
                <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 25px 40px; text-align: center;">
                  <table cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;">
                    <tr>
                      <td style="width: 50px; height: 50px; background-color: rgba(255,255,255,0.2); border-radius: 50%; text-align: center; vertical-align: middle;">
                        <span style="color: #ffffff; font-size: 24px; line-height: 50px;">&#10003;</span>
                      </td>
                    </tr>
                  </table>
                  <h1 style="color: #ffffff; margin: 15px 0 0; font-size: 22px; font-weight: 600;">
                    Application Received
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
                    Thank you for your interest in joining JBAF Consulting. We have received your application and CV successfully.
                  </p>

                  <p style="color: #475569; line-height: 1.7; margin: 0 0 30px; font-size: 15px;">
                    Our team will carefully review your application and get back to you within <strong style="color: #1e293b;">5 business days</strong> if your profile matches our current opportunities.
                  </p>

                  <!-- Application Summary Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                          Application Summary
                        </h3>

                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                              <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Date Submitted</span><br>
                              <span style="color: #1e293b; font-size: 15px; font-weight: 500;">${currentDate}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Status</span><br>
                              <span style="display: inline-block; padding: 5px 12px; background-color: #dcfce7; color: #166534; font-size: 13px; font-weight: 600; border-radius: 6px; margin-top: 5px;">
                                Under Review
                              </span>
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
                        <a href="${SITE_URL}/careers" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px;">
                          View More Opportunities
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
                        <a href="${SITE_URL}/careers" style="color: #64748b; text-decoration: none; font-size: 13px; margin: 0 10px;">Careers</a>
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
                          This email was sent in response to your CV submission on our website.<br>
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

function generateAdminCVNotificationHTML(data: {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  currentPosition: string;
  coverLetter: string;
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
      <title>New CV Submission - JBAF Consulting</title>
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
                <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px 40px; text-align: center;">
                  <span style="color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
                    New CV Submission
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

                  <!-- Applicant Details Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                          Applicant Details
                        </h3>

                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="120" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Name</td>
                                  <td style="color: #1e293b; font-size: 15px; font-weight: 600;">${data.fullName}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="120" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Email</td>
                                  <td><a href="mailto:${data.email}" style="color: #3b82f6; font-size: 15px; text-decoration: none;">${data.email}</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="120" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Phone</td>
                                  <td><a href="tel:${data.phone}" style="color: #3b82f6; font-size: 15px; text-decoration: none;">${data.phone}</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          ${data.linkedin ? `
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="120" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">LinkedIn</td>
                                  <td><a href="${data.linkedin}" style="color: #3b82f6; font-size: 15px; text-decoration: none;">${data.linkedin}</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td style="padding: 12px 0;">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td width="120" style="color: #64748b; font-size: 13px; font-weight: 500; vertical-align: top;">Position</td>
                                  <td>
                                    <span style="display: inline-block; padding: 5px 12px; background-color: #dbeafe; color: #1d4ed8; font-size: 13px; font-weight: 600; border-radius: 6px;">
                                      ${data.currentPosition}
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

                  <!-- Cover Letter Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                          Cover Letter
                        </h3>
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 3px solid #10b981;">
                          <p style="color: #475569; line-height: 1.7; margin: 0; font-size: 15px; white-space: pre-wrap;">${data.coverLetter}</p>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Note about CV -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fef3c7; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 15px 20px;">
                        <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
                          <strong>Note:</strong> The applicant's CV is attached to this email.
                        </p>
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
                              <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px;">
                                Contact ${data.fullName.split(' ')[0]}
                              </a>
                            </td>
                            <td>
                              <a href="tel:${data.phone}" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #10b981; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px; border: 2px solid #10b981;">
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
                          Automated notification from JBAF Consulting careers page<br>
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
    const formData = await request.formData();

    // Extract form fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const linkedin = formData.get('linkedin') as string;
    const currentPosition = formData.get('currentPosition') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const consent = formData.get('consent') === 'true';
    const cvFile = formData.get('cv') as File;
    const recaptchaToken = formData.get('recaptchaToken') as string;

    // Verify reCAPTCHA token
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Validate the data
    const validatedData = cvSubmissionSchema.parse({
      fullName,
      email,
      phone,
      linkedin: linkedin || '',
      currentPosition,
      coverLetter,
      consent,
    });

    // Validate CV file
    if (!cvFile) {
      return NextResponse.json(
        { error: 'CV file is required' },
        { status: 400 }
      );
    }

    // Check if Gmail OAuth credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
      console.error('Gmail OAuth credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly.' },
        { status: 500 }
      );
    }

    // Convert file to buffer for attachment
    const cvBuffer = await cvFile.arrayBuffer();

    const transporter = await createTransporter();
    const emailTo = process.env.EMAIL_TO || 'info@jbafconsult.com, joseph@jbafconsult.com';

    // Send notification email to admin with CV attachment
    await transporter.sendMail({
      from: `"JBAF Consulting Careers" <${process.env.GMAIL_USER}>`,
      to: emailTo,
      replyTo: validatedData.email,
      subject: `New CV Submission: ${validatedData.fullName} - ${validatedData.currentPosition}`,
      html: generateAdminCVNotificationHTML(validatedData),
      attachments: [
        {
          filename: cvFile.name,
          content: Buffer.from(cvBuffer),
        },
      ],
    });

    // Send confirmation email to the applicant
    try {
      await transporter.sendMail({
        from: `"JBAF Consulting" <${process.env.GMAIL_USER}>`,
        to: validatedData.email,
        subject: 'Application Received - JBAF Consulting',
        html: generateApplicantConfirmationHTML(validatedData.fullName),
      });
    } catch (confirmationError) {
      console.error('Error sending confirmation email:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      { message: 'CV submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing CV submission:', error);
    return NextResponse.json(
      { error: 'Failed to submit CV. Please try again.' },
      { status: 500 }
    );
  }
}
