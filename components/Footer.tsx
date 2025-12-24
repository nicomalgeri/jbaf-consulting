import Link from 'next/link';
import { Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-white via-[#f6f9ff] to-[#eef3ff] text-gray-900 text-[0.95rem] leading-relaxed">
      <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />
      <div className="container-custom relative py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold font-heading mb-4">JBAF Consulting</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Unlock lasting impact with JBAF Consulting where collaboration, talent development,
              and service excellence converge to build high-performing teams and deliver outcomes that matter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold font-heading mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base font-semibold font-heading mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">
                  City Road, London EC1V 2NX
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <div className="flex flex-col text-gray-600">
                  <a href="tel:+442073284499" className="hover:text-gray-900 transition-colors">
                    +44-20-7328-4499
                  </a>
                  <a href="tel:+9934878989" className="hover:text-gray-900 transition-colors">
                    +99-34-8878-9989
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:info@jbafconsult.com"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  info@jbafconsult.com
                </a>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/80 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500">
              © {currentYear} JBAF Consulting. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
