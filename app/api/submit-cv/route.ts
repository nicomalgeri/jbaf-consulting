import { NextRequest, NextResponse } from 'next/server';
import { cvSubmissionSchema } from '@/lib/validations';
import { sendEmail } from '@/lib/gmail';

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

    // Convert file to buffer for attachment
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());

    // Send email with CV attachment using Gmail
    const emailResult = await sendEmail({
      to: process.env.GMAIL_USER || 'joseph@jbafconsult.com',
      subject: `New CV Submission - ${validatedData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A2540 0%, #1e40af 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New CV Submission</h1>
          </div>

          <div style="padding: 30px; background: #f9fafb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">Full Name:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">
                  ${validatedData.fullName}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">Email:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${validatedData.email}" style="color: #2563eb;">${validatedData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">Phone:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="tel:${validatedData.phone}" style="color: #2563eb;">${validatedData.phone}</a>
                </td>
              </tr>
              ${validatedData.linkedin ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">LinkedIn:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="${validatedData.linkedin}" style="color: #2563eb;">${validatedData.linkedin}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">Current Position:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">
                  ${validatedData.currentPosition}
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <strong style="color: #374151; display: block; margin-bottom: 12px;">Cover Letter:</strong>
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; color: #111827; line-height: 1.6;">
                ${validatedData.coverLetter.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #dbeafe; border-radius: 8px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                📎 <strong>CV Attached:</strong> ${cvFile.name}
              </p>
            </div>
          </div>

          <div style="padding: 20px; background: #f3f4f6; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This email was sent from the JBAF Consulting careers page.<br>
              Applicant has consented to data processing in accordance with GDPR.
            </p>
          </div>
        </div>
      `,
      replyTo: validatedData.email,
      attachments: [
        {
          filename: cvFile.name,
          content: cvBuffer,
        },
      ],
    });

    if (!emailResult.success) {
      console.error('Error sending email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'CV submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing CV submission:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}
