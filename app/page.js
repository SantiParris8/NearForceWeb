'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, BarChart3, MessageSquare } from 'lucide-react';
import Image from 'next/image';

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
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
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
              <Button variant="ghost">Solutions</Button>
              <Button variant="ghost">Services</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact</Button>
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
  <span className="gradient-text-primary animated-gradient">
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
              <Image
                src="/api/placeholder/800/600"
                alt="Hero Image"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map(({ id, stat, label, icon: Icon }) => (
  <Card key={id} gradient className="p-6">
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <Icon className="w-6 h-6 text-blue-500" />
        <h3 className="text-4xl font-bold gradient-text-primary">
          {stat}
        </h3>
      </div>
      <p className="text-gray-600">{label}</p>
    </div>
  </Card>
))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
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

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-lg mx-auto p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
              <p className="text-gray-600">
                Let's discuss how we can transform your business with Salesforce
              </p>
            </div>
            <form action="https://formsubmit.co/your-email@example.com" method="POST" className="space-y-4">
              <input type="hidden" name="_next" value="https://yoursite.com/thanks" />
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
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
                Submit
              </Button>
            </form>
          </Card>
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