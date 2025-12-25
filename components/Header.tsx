'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { services } from '@/lib/services';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];
  const mobileLinks = navigation.filter((item) => item.name !== 'Services');
  const navLinkClassName =
    'relative text-sm font-semibold tracking-[0.04em] text-gray-700/90 transition-colors hover:text-primary-600 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary-500 after:to-accent-500 after:transition-all after:duration-300 hover:after:w-full';
  const servicePanelId = 'mobile-services-panel';
  const mobileMenuId = 'mobile-main-menu';

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    setIsServicesOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-premium relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-200/80 to-transparent" />
      <nav className="container-custom relative">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Logo.png"
              alt="JBAF Consulting"
              width={675}
              height={445}
              className="h-10 w-auto sm:h-12 lg:h-14"
              priority
            />
            <span className="sr-only">JBAF Consulting</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) =>
              item.name === 'Services' ? (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`${navLinkClassName} inline-flex items-center gap-2`}
                  >
                    Services
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div className="absolute left-0 top-full z-50 pt-4 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                    <div className="w-80 rounded-2xl border border-gray-200/80 bg-white/95 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.name} href={item.href} className={navLinkClassName}>
                  {item.name}
                </Link>
              ),
            )}
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls={mobileMenuId}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id={mobileMenuId}
          className={`md:hidden absolute left-0 right-0 top-full z-40 ${
            isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div
            className={`mt-3 transform-gpu transition-[opacity,transform] duration-300 ease-out ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            <div className="rounded-2xl border border-gray-100/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur-none sm:backdrop-blur-xl">
              <div className="pb-6 pt-4">
                <div className="space-y-1">
                  {mobileLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-base font-semibold tracking-[0.02em] text-gray-700/90 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="px-4 pt-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold tracking-[0.02em] text-gray-700/90 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      aria-expanded={isServicesOpen}
                      aria-controls={servicePanelId}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isServicesOpen ? 'rotate-180 text-primary-600' : 'text-gray-500'
                        }`}
                      />
                    </button>
                    <div
                      id={servicePanelId}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                      aria-hidden={!isServicesOpen}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-1 space-y-1 px-2 pb-1">
                          {services.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              className="block px-4 py-2.5 text-sm font-semibold text-gray-700/90 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                              onClick={closeMenu}
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pt-2">
                    <Button variant="primary" size="md" className="w-full" asChild>
                      <Link href="/contact" onClick={closeMenu}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
