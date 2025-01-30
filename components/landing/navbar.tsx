import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Layout,
  Users,
  BarChart,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "Products",
      dropdown: [
        { title: "Store Management", icon: <Layout className="w-5 h-5" /> },
        { title: "Customer Analytics", icon: <Users className="w-5 h-5" /> },
        { title: "Reports & Insights", icon: <BarChart className="w-5 h-5" /> },
      ],
    },
    {
      title: "Solutions",
      dropdown: [
        { title: "Enterprise", icon: <Settings className="w-5 h-5" /> },
        { title: "Small Business", icon: <Layout className="w-5 h-5" /> },
        { title: "Startups", icon: <Users className="w-5 h-5" /> },
      ],
    },
    { title: "Pricing" },
    { title: "Resources" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="ml-2 text-xl font-bold text-blue-900">
                Consent.io
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() =>
                  //@ts-expect-error This condition checks if the item has a dropdown before activating it
                  setActiveDropdown(item.dropdown ? index : null)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                >
                  <span>{item.title}</span>
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-lg py-2 border border-blue-100"
                    >
                      {item.dropdown.map((dropItem, idx) => (
                        <motion.a
                          key={idx}
                          href="#"
                          whileHover={{ x: 5, backgroundColor: "#F3F4F6" }}
                          className="flex items-center px-4 py-3 text-gray-600 hover:text-blue-500"
                        >
                          {dropItem.icon}
                          <span className="ml-3">{dropItem.title}</span>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-2 text-gray-600 hover:text-blue-500"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-2 text-gray-600 hover:text-blue-500 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-gray-600 hover:text-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full text-left px-4 py-3 text-gray-600 hover:text-blue-500 flex items-center justify-between"
                    onClick={() =>
                      //@ts-expect-error This toggles the dropdown visibility in the mobile menu based on its current state
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                  >
                    <span>{item.title}</span>
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </motion.button>

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 px-4 py-2"
                      >
                        {item.dropdown.map((dropItem, idx) => (
                          <motion.a
                            key={idx}
                            href="#"
                            whileHover={{ x: 5 }}
                            className="flex items-center px-4 py-3 text-gray-600 hover:text-blue-500"
                          >
                            {dropItem.icon}
                            <span className="ml-3">{dropItem.title}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="px-4 py-4 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
