export type Service = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: 'leadership-team-development-solutions',
    title: 'Leadership & Team Development Solutions',
    summary:
      'We design practical programmes that build confident leaders and high-performing teams. Through coaching and targeted workshops, we strengthen capability, align teams, and turn insight into action, driving measurable performance and lasting impact.',
    details: [
      'We deliver programmes that build capability, strengthen collaboration, and empower growth.',
      'Designed to unlock potential and accelerate performance, each programme develops confident leaders and cohesive teams ready for evolving challenges.',
      'Through coaching, strategy workshops, and tailored development sessions, we help individuals and teams perform with clarity, agility, and impact. Each engagement is practical, insight-driven, and outcome-focused.',
      'Our adaptive approach sharpens skills, shifts mindsets, and turns learning into action. Coaching boosts individual effectiveness, while workshops align teams around shared goals. Whether navigating change, embedding new ways of working, or scaling capability, we provide ongoing support that sustains progress and delivers lasting value.',
    ],
    image: '/services-leadership.jpg',
    alt: 'Leadership and team development session',
  },
  {
    slug: 'staffing',
    title: 'Staffing',
    summary:
      'We deliver insight-led staffing solutions aligned to your strategic and operational goals. Beyond recruitment, we support workforce planning to build resilient, future-ready teams that strengthen delivery and accelerate transformation.',
    details: [
      'As a trusted partner, we shape workforce solutions that empower organisations to perform, adapt, and thrive.',
      'Working in close partnership with clients, our team identifies, assesses, and places talent aligned to operational priorities and long-term objectives, ensuring every appointment strengthens delivery outcomes.',
      'This approach extends beyond recruitment. Workforce planning is integrated into broader programme and organisational frameworks, enabling clients to build resilient teams equipped to lead, adapt, and excel.',
      'From sourcing project-critical roles to shaping future-ready resource strategies, our insight-led process ensures alignment, continuity, and measurable impact.',
      'Trusted for diligence, intuition, and discretion, we help organisations navigate complex talent challenges with confidence, building teams that accelerate transformation, uphold performance, and reflect institutional values.',
    ],
    image: '/services-staffing.png',
    alt: 'Strategic staffing and workforce planning',
  },
  {
    slug: 'digital-transformation-insights',
    title: 'Digital Transformation & Insights',
    summary:
      'We unlock actionable insight through data, analytics, and digitised operations. By integrating systems and transforming data into intelligence, we improve decision-making, performance, and service quality, securely and responsibly.',
    details: [
      'Understanding the root cause is the first step toward achieving organisational goals.',
      'We unlock insights through advanced analytics and digitised operational data, driving sustainable transformation across service delivery and quality standards. Our solutions convert raw data into actionable intelligence, tailored to diverse analytical needs.',
      'By integrating front-end and back-end information systems, we enable seamless data flow, secure access, and structured visibility. All data is handled with integrity, confidentiality, and transparency, ensuring responsible use across every touchpoint.',
      'From behavioural analysis to workflow optimisation, key processes are digitised for clarity, compliance, and performance. Aligned data strategy enhances decision-making, agility, and stakeholder engagement, turning information into a strategic asset for continuous improvement and competitive edge.',
    ],
    image: '/services-digital.jpg',
    alt: 'Digital transformation analytics',
  },
  {
    slug: 'corporate-communication-stakeholder-engagement',
    title: 'Corporate Communication & Stakeholder Engagement',
    summary:
      'We help organisations communicate with clarity and credibility. From strategy and messaging to campaigns and engagement, we align narratives, strengthen relationships, and ensure stakeholders stay informed, connected, and invested.',
    details: [
      'We work across client teams to co-create strategies that unlock opportunity, navigate complexity, and build trust.',
      'Our approach blends communications, brand positioning, and engagement planning to ensure key narratives reach the right audiences, internally, externally, and across delivery ecosystems.',
      'Messaging is shaped collaboratively to reflect organisational value and align brand identity with strategic goals. Activities span campaign planning, executive and team communications, internal engagement, and reputation management, underpinned by behavioural insight and structured frameworks.',
      'Information flows are streamlined, relationships cultivated, and smart technologies applied to close gaps. Every touchpoint reinforces credibility, alignment, and impact, keeping stakeholders informed, invested, and connected to the brand narrative.',
    ],
    image: '/services-communication.jpg',
    alt: 'Corporate communication strategy',
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
