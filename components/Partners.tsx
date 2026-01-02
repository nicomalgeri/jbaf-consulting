import Image from 'next/image';

const partners = [
  {
    name: 'NHS',
    logo: '/icons/NHS.png',
    width: 200,
    height: 80,
  },
  {
    name: 'Cirrus Consortium',
    logo: '/icons/Cirrus-Consortium.jpeg',
    width: 260,
    height: 90,
  },
  {
    name: 'Cyber Essentials',
    logo: '/icons/cyber-essentials.png',
    width: 220,
    height: 90,
  },
] as const;

export default function Partners() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] tech-pattern tech-pattern-light" />
      <div className="container-custom relative">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-h2 font-heading text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by organisations who value practical, outcome-focused support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex min-h-[110px] items-center justify-center rounded-2xl border border-gray-200/70 bg-white/90 px-8 py-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className="h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
