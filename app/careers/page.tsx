import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CVSubmissionForm from '@/components/CVSubmissionForm';
import { Users, TrendingUp, Heart, Award, Globe, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Careers - Join JBAF Consulting',
  description: 'Join our team of expert consultants and make a lasting impact. Explore career opportunities at JBAF Consulting.',
};

export default function CareersPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities and career development programmes to help you reach your full potential.',
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work alongside talented professionals in an environment that values teamwork and knowledge sharing.',
    },
    {
      icon: Briefcase,
      title: 'Impactful Projects',
      description: 'Engage with challenging projects across diverse sectors, making a real difference to organisations.',
    },
    {
      icon: Globe,
      title: 'Flexible Working',
      description: 'Enjoy hybrid working arrangements that support work-life balance and personal wellbeing.',
    },
    {
      icon: Award,
      title: 'Competitive Package',
      description: 'Attractive salary, performance bonuses, and comprehensive benefits including health insurance.',
    },
    {
      icon: Heart,
      title: 'Inclusive Environment',
      description: 'Be part of a diverse, inclusive team where every voice is heard and valued.',
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-primary-100">
              Build your career with JBAF Consulting and help organisations achieve
              lasting transformation. We're looking for talented consultants who are
              passionate about making an impact.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-heading text-primary-900 mb-4">
              Why Join JBAF Consulting?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We invest in our people because they are our greatest asset
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="bg-primary-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Look For Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-heading text-primary-900 mb-8 text-center">
              What We Look For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Experience & Expertise</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Proven track record in consulting or relevant sector
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Strong analytical and problem-solving skills
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Expertise in programme delivery or strategic planning
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Qualities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Excellent communication and stakeholder management
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Adaptable, resilient, and client-focused mindset
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Passion for continuous learning and development
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CV Submission Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-heading text-primary-900 mb-4">
                Submit Your Application
              </h2>
              <p className="text-xl text-gray-600">
                We're always looking for talented individuals to join our team.
                Even if we don't have a specific opening that matches your profile,
                we'd love to hear from you.
              </p>
            </div>

            <Card className="p-8">
              <CVSubmissionForm />
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
