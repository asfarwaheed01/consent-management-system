"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Phone, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";

const StoresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample data
  const stores = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Store ${i + 1}`,
    category: ["Electronics", "Fashion", "Food", "Books"][
      Math.floor(Math.random() * 4)
    ],
    rating: (Math.random() * 2 + 3).toFixed(1),
    address: `${Math.floor(Math.random() * 999)} Main Street`,
    phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(
      Math.floor(Math.random() * 9000) + 1000
    )}`,
    hours: "9:00 AM - 9:00 PM",
    customers: Math.floor(Math.random() * 1000) + 100,
  }));

  const categories = ["All", "Electronics", "Fashion", "Food", "Books"];

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || store.category === selectedCategory)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      <Navbar />
      <div className="max-w-7xl mx-auto py-20 px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-blue-900 mb-8"
        >
          Our Stores
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2 text-blue-400" />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStores.map((store) => (
            <Link href={`/stores/customers`} key={store.id}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-blue-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-blue-900">
                    {store.name}
                  </h2>
                  <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {store.rating}
                  </span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {store.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    {store.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    {store.hours}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-50">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-500 font-medium">
                      {store.category}
                    </span>
                    <span className="text-gray-500">
                      {store.customers} Customers
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StoresPage;
