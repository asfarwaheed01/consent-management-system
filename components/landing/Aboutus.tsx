import { Users, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

const AboutUsSection = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50M+", label: "Forms Processed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and continuously improve based on their feedback.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Constantly pushing boundaries to provide cutting-edge solutions.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "Committed to delivering the highest quality in everything we do.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">About Us</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We are on a mission to revolutionize consent management through
            innovation and security
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <h3 className="text-3xl font-bold text-blue-500 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="text-blue-500 mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-900 text-white p-12 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            To empower businesses with secure, efficient, and intelligent
            consent management solutions that protect data privacy while driving
            digital transformation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
