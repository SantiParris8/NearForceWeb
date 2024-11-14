'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, BarChart3, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import VectorGlobe from '@/components/VectorGlobe'
import ParticleBackground from '@/components/ParticleBackground'
import DynamicStats from '@/components/DynamicStats'
import localFont from 'next/font/local'

// Load Harabara font
const harabara = localFont({
  src: '../public/fonts/Harabara.ttf',
  variable: '--font-harabara'
})

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
      image: '/NearForceWeb/images/320',
    },
    {
      title: 'Custom Development',
      description: 'Bespoke solutions and integrations that extend Salesforce capabilities.',
      image: '/NearForceWeb/images/320',
    },
    {
      title: 'Consulting & Strategy',
      description: 'Strategic guidance to maximize your Salesforce ROI.',
      image: '/NearForceWeb/images/320',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ParticleBackground />
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Image
                  src="/NearForceWeb/images/logo.png"
                  alt="NearForce Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <span className={`${harabara.variable} font-harabara text-2xl text-gray-600`}>
                NearForce
              </span>
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
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
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
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                  Get Started
                </Button>
                <Button variant="outline">Watch Demo</Button>
              </div>
            </motion.div>
            <div className="flex-1 relative h-96">
            <VectorGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((data) => (
    <DynamicStats key={data.id} {...data} />
  ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="text-gray-600 mt-4">
              Comprehensive Salesforce solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-xl">
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
              >
                <h2 className="text-3xl font-bold mb-6">About NearForce</h2>
                <p className="text-gray-600 mb-6">
                  At NearForce, we're more than just a Salesforce consulting firm. We're your partners in digital transformation, 
                  committed to delivering exceptional CRM solutions that drive business growth and innovation.
                </p>
                <p className="text-gray-600 mb-6">
                  With over a decade of experience and hundreds of successful implementations, our team of certified experts 
                  brings unparalleled expertise to every project. We understand that each business is unique, which is why 
                  we take a customized approach to every solution we deliver.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-600">Our Mission</h3>
                    <p className="text-gray-600">
                      To empower businesses with innovative Salesforce solutions that drive growth and success.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-600">Our Vision</h3>
                    <p className="text-gray-600">
                      To be the most trusted name in Salesforce consulting, known for excellence and innovation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex-1 relative h-[500px]">
              <Image
                src="/NearForceWeb/images/600"
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
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 relative h-[600px]">
              <Image
                src="/NearForceWeb/images/600"
                alt="Contact Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                  <p className="text-gray-600">
                    Let's discuss how we can transform your business with Salesforce
                  </p>
                </div>
                <form action="https://formsubmit.co/santiiparris@gmail.com.com" method="POST" className="space-y-4">
                  <input type="hidden" name="_next" value="https://santiparris8.github.io/NearForceWeb/" />
                  <input type="hidden" name="_subject" value="New NearForce Contact!" />
                  <input type="hidden" name="_captcha" value="false" />
                  
                  <div>
                    <Input 
                      name="name"
                      placeholder="Full Name" 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Email" 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      name="company"
                      placeholder="Company" 
                      required 
                    />
                  </div>
                  <div>
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your project" 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-br from-blue-600 to-cyan-400">
                    Submit
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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