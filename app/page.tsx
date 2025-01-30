// app/page.tsx
// import { Navbar } from "@/components/landing/navbar";
// import { HeroSection } from "@/components/landing/hero-section";
// import { FeaturesSection } from "@/components/landing/features-section";
// import { Footer } from "@/components/landing/footer";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <main>
//         <HeroSection />
//         <FeaturesSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  Zap,
  ChevronRight,
  Star,
  QrCode,
  Store,
  FileCheck,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import fromValidation from "@/public/assets/form.png";
import insights from "@/public/assets/brain.jpg";
import secure from "@/public/assets/top-10-ways-to-secure-your-data.jpg";
import Image from "next/image";
import ProcessSection from "@/components/landing/ProcessSection";
import FaqSection from "@/components/landing/FaqSection";
import AboutUsSection from "@/components/landing/Aboutus";
const LandingPage = () => {
  const steps = [
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Scan QR Code",
      description: "Simply scan the QR code at any participating location",
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: "Select Store",
      description: "Choose your store from our extensive network",
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Fill Form",
      description: "Complete the digital consent form securely",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Get Validated",
      description: "Receive instant validation and confirmation",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Store Manager",
      content:
        "This platform has revolutionized how we handle consent forms. The efficiency gains are remarkable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content:
        "The AI-driven insights have helped us understand our customers better. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director",
      content:
        "Security was our top concern, and this solution exceeded our expectations.",
      rating: 5,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <Navbar />
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-blue-500 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-blue-900 mb-6">
              Transform Your
              <span className="text-blue-500"> Consent Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Seamlessly Manage Consent Forms with Ease and Security
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2 mx-auto"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
      <AboutUsSection />
      {/* Features Section */}
      {/* // Features Section with fixed image containers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-blue-900 text-center mb-24"
          >
            Powerful Features for Your Business
          </motion.h2>

          {/* AI-Driven Insights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-center gap-12 mb-32"
          >
            <div className="flex-1 lg:pr-8">
              <div className="text-blue-500 mb-4">
                <Brain className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">
                AI-Driven Insights
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Leverage advanced AI algorithms to gain valuable insights from
                your consent form data. Our intelligent system analyzes
                patterns, predicts trends, and helps you make data-driven
                decisions for your business growth.
              </p>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center text-blue-500 font-semibold group"
              >
                Learn More
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            <div className="w-full lg:w-1/2 min-h-[300px]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl relative"
              >
                <Image
                  src={insights}
                  alt="AI-Driven Insights"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Secure Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-32"
          >
            <div className="flex-1 lg:pl-8">
              <div className="text-blue-500 mb-4">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">
                Secure Data Management
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Enterprise-grade security ensuring your sensitive data remains
                protected at all times. With advanced encryption, regular
                audits, and compliance with global security standards, your data
                is in safe hands.
              </p>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center text-blue-500 font-semibold group"
              >
                Learn More
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            <div className="w-full lg:w-1/2 min-h-[300px]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl relative"
              >
                <Image
                  src={secure}
                  alt="Secure Data Management"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Real-Time Validation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1 lg:pr-8">
              <div className="text-blue-500 mb-4">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">
                Real-Time Validation
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Instant validation and verification of consent forms with
                automated error detection. Our smart system ensures accuracy,
                completeness, and compliance in real-time, saving you valuable
                time and resources.
              </p>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center text-blue-500 font-semibold group"
              >
                Learn More
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            <div className="w-full lg:w-1/2 min-h-[300px]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl relative"
              >
                <Image
                  src={fromValidation}
                  alt="Real-Time Validation"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-16">
            How It Works
          </h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 transform -translate-y-1/2 hidden md:block" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-16">
            What Our Users Say
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <h4 className="font-semibold text-blue-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <ProcessSection />
      <FaqSection />
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    AI Insights
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300 transition-colors">
                    Integration
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-sm text-blue-300">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
