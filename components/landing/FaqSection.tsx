import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MinusCircle, PlusCircle } from "lucide-react";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How secure is the data storage?",
      answer:
        "We employ enterprise-grade encryption and security measures to protect your data. Our systems are regularly audited and comply with international security standards to ensure maximum protection of your sensitive information.",
    },
    {
      question: "Can I customize the consent forms?",
      answer:
        "Yes, our platform offers full customization options for consent forms. You can add your branding, modify fields, and create templates that match your specific requirements while maintaining compliance with relevant regulations.",
    },
    {
      question: "How does the validation process work?",
      answer:
        "Our AI-powered system performs real-time validation checks on submitted forms, verifying completeness, accuracy, and compliance with predefined rules. You'll receive instant notifications of any issues requiring attention.",
    },
    {
      question: "What types of analytics are available?",
      answer:
        "Our platform provides comprehensive analytics including submission rates, completion times, validation statistics, and trend analysis. You can generate custom reports and export data in various formats.",
    },
    {
      question: "Is the platform GDPR compliant?",
      answer:
        "Yes, our platform is fully GDPR compliant and helps you maintain compliance with various data protection regulations. We regularly update our systems to adapt to changing regulatory requirements.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-blue-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? 0 : index)
                }
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-blue-50 transition-colors"
              >
                <span className="font-semibold text-lg text-blue-900">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <MinusCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                ) : (
                  <PlusCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="p-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
