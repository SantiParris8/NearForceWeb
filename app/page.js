'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, BarChart3, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import VectorGlobe from '@/components/VectorGlobe'
import ParticleBackground from '@/components/ParticleBackground'
import DynamicStats from '@/components/DynamicStats'

// Simplified Components
const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'button-primary',
    ghost: 'button-ghost',
    outline: 'button-outline'
  };
  
  return (
    <button 
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', gradient = false, ...props }) => (
  <div 
    className={`
      ${gradient ? 'card-gradient' : 'bg-white'} 
      rounded-xl shadow-custom hover:shadow-xl 
      transition-all duration-300 
      ${className}
    `} 
    {...props}
  >
    {children}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`input-base ${className}`}
    {...props}
  />
);

const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`input-base min-h-[100px] ${className}`}
    {...props}
  />
);

export default function Home() {

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const statsData = [
    { id: 1, stat: '500+', label: 'Enterprise Clients', icon: Users },
    { id: 2, stat: '98%', label: 'Client Retention', icon: CheckCircle2 },
    { id: 3, stat: '$2B+', label: 'Revenue Generated', icon: BarChart3 },
    { id: 4, stat: '50+', label: 'Certified Experts', icon: MessageSquare },
  ];

  const services = [
    {
      title: 'Salesforce Implementation',
      description: 'End-to-end implementation services tailored to your business needs.',
      image: '/api/placeholder/400/320',
    },
    {
      title: 'Custom Development',
      description: 'Bespoke solutions and integrations that extend Salesforce capabilities.',
      image: '/api/placeholder/400/320',
    },
    {
      title: 'Consulting & Strategy',
      description: 'Strategic guidance to maximize your Salesforce ROI.',
      image: '/api/placeholder/400/320',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ParticleBackground />
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-md bg-white/70 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Image
                src="/api/placeholder/150/40"
                alt="NearForce Logo"
                width={150}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <Button variant="ghost" onClick={() => scrollToSection('services')}>Services</Button>
              <Button variant="ghost" onClick={() => scrollToSection('about')}>About</Button>
              <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 backdrop-blur-sm bg-white/50 p-8 rounded-2xl"
            >
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Transform Your Business with{' '}
                <span className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Salesforce Excellence
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Partner with the leading Salesforce consultancy to unlock your business potential.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90">
                  Get Started
                </Button>
                <Button variant="outline" className="backdrop-blur-md bg-white/50 border-white">Watch Demo</Button>
              </div>
            </motion.div>
            <div className="flex-1 relative h-96">
              <VectorGlobe />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((data) => (
              <div key={data.id} className="backdrop-blur-md bg-white/40 p-6 rounded-xl border border-white/20 shadow-lg hover:bg-white/50 transition-all duration-300">
                <DynamicStats {...data} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 backdrop-blur-md bg-white/30 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="text-gray-600 mt-4">
              Comprehensive Salesforce solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="backdrop-blur-md bg-white/40 overflow-hidden transition-all hover:bg-white/60 border border-white/20">
                <div className="relative w-full h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>



      <div className="relative">
      <motion.div
    animate={{
      y: [0, 20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
  />
 <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-md bg-white/40 p-8 rounded-2xl border border-white/20"
              >
                {/* About content remains the same */}
              </motion.div>
            </div>
            <div className="flex-1 relative h-[500px]">
              <Image
                src="/api/placeholder/600/500"
                alt="About Us Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Contact Form */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 relative h-[600px]">
              <Image
                src="/api/placeholder/800/600"
                alt="Contact Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <Card className="backdrop-blur-xl bg-white/60 p-6 border border-white/20">
                {/* Contact form content remains the same */}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-md text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NearForce</h3>
              <p className="text-gray-400">
                Leading Salesforce consulting firm delivering exceptional CRM solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Implementation</li>
                <li>Custom Development</li>
                <li>Consulting</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NearForce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}