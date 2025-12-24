import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { cvSubmissionSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
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
    const cvBuffer = await cvFile.arrayBuffer();
    const cvBase64 = Buffer.from(cvBuffer).toString('base64');

    // Send email with CV attachment using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'careers@jbafconsult.com',
      subject: `New CV Submission - ${validatedData.fullName}`,
      html: `
        <h2>New CV Submission</h2>
        <p><strong>Full Name:</strong> ${validatedData.fullName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        ${validatedData.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${validatedData.linkedin}">${validatedData.linkedin}</a></p>` : ''}
        <p><strong>Current Position:</strong> ${validatedData.currentPosition}</p>
        <hr>
        <h3>Cover Letter</h3>
        <p>${validatedData.coverLetter.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This email was sent from the JBAF Consulting careers page.<br>
          Applicant has consented to data processing in accordance with GDPR.
        </p>
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: cvBase64,
        },
      ],
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'CV submitted successfully', data },
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
