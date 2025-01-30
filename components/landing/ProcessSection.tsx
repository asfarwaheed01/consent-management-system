import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  QrCode,
  FileCheck,
  CheckCircle,
  Store,
} from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Scan QR Code",
      description:
        "Simply scan the unique QR code at any participating location to begin the process securely.",
      color: "bg-blue-500",
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: "Select Store",
      description:
        "Choose your preferred store from our extensive network of trusted partners.",
      color: "bg-indigo-500",
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Fill Form",
      description:
        "Complete the digital consent form with our user-friendly interface.",
      color: "bg-purple-500",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Get Validated",
      description:
        "Receive instant validation and confirmation of your submission.",
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our streamlined process makes consent management simple, secure, and
            efficient
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 h-full">
                <div
                  className={`${step.color} text-white p-4 rounded-xl inline-block mb-4`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ChevronRight className="w-6 h-6 text-blue-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
