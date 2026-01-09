import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { sendEmail, verifyRecaptcha } from '@/lib/gmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // Verify reCAPTCHA token if provided
    if (validatedData.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(validatedData.recaptchaToken);
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Format service interest for display
    const serviceLabels: Record<string, string> = {
      'strategic-delivery': 'Strategic Delivery & Operational Support',
      'leadership-development': 'Leadership & Team Development Solutions',
      'staffing': 'Staffing',
      'digital-transformation': 'Digital Transformation & Insights',
      'corporate-communication': 'Corporate Communication & Stakeholder Engagement',
      'general': 'General Inquiry',
    };

    const serviceLabel = serviceLabels[validatedData.serviceInterest] || validatedData.serviceInterest;

    // Send email using Gmail
    const emailResult = await sendEmail({
      to: process.env.GMAIL_USER || 'joseph@jbafconsult.com',
      subject: `New Contact Form Submission - ${serviceLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A2540 0%, #1e40af 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>

          <div style="padding: 30px; background: #f9fafb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">Name:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">
                  ${validatedData.name}
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
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">Service of Interest:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">
                  ${serviceLabel}
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <strong style="color: #374151; display: block; margin-bottom: 12px;">Message:</strong>
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; color: #111827; line-height: 1.6;">
                ${validatedData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>

          <div style="padding: 20px; background: #f3f4f6; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This email was sent from the JBAF Consulting website contact form.<br>
              The sender has agreed to the Privacy Policy and Terms of Use.
            </p>
          </div>
        </div>
      `,
      replyTo: validatedData.email,
    });

    if (!emailResult.success) {
      console.error('Error sending email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}
