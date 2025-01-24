import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const variants = {
  orbital: {
    container: "relative w-20 h-20",
    outer:
      "absolute inset-0 border-4 border-r-transparent border-black dark:border-white rounded-full animate-spin-slow",
    inner:
      "absolute inset-2 border-4 border-l-transparent border-black dark:border-white rounded-full animate-spin-reverse",
    center:
      "absolute inset-5 bg-black dark:bg-white rounded-full animate-pulse",
  },
  pulse: {
    container: "flex space-x-2",
    dots: "w-3 h-3 bg-black dark:bg-white rounded-full",
  },
  wave: {
    container: "flex space-x-1 items-center",
    bar: "w-1.5 h-8 bg-black dark:bg-white rounded-full",
  },
};

interface LoadingProps {
  variant?: "orbital" | "pulse" | "wave";
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  variant = "orbital",
  size = "md",
  className,
  text,
}) => {
  const sizeClasses = {
    sm: "scale-75",
    md: "scale-100",
    lg: "scale-150",
  };

  const OrbitalLoader = () => (
    <div className={cn(variants.orbital.container, sizeClasses[size])}>
      <div className={variants.orbital.outer} />
      <div className={variants.orbital.inner} />
      <div className={variants.orbital.center} />
    </div>
  );

  const PulseLoader = () => (
    <div className={cn(variants.pulse.container, sizeClasses[size])}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={variants.pulse.dots}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const WaveLoader = () => (
    <div className={cn(variants.wave.container, sizeClasses[size])}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={variants.wave.bar}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      {variant === "orbital" && <OrbitalLoader />}
      {variant === "pulse" && <PulseLoader />}
      {variant === "wave" && <WaveLoader />}
      {text && (
        <p className="text-sm font-medium text-black dark:text-white animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// Create a fullscreen loader component
export const FullscreenLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-6">
      <Loading variant="orbital" size="lg" />
      {text && (
        <p className="text-lg font-medium text-black dark:text-white animate-pulse">
          {text}
        </p>
      )}
    </div>
  </div>
);

// Create a page loader component
export const PageLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="min-h-[400px] w-full flex items-center justify-center">
    <div className="flex flex-col items-center space-y-6">
      <Loading variant="wave" size="md" />
      {text && (
        <p className="text-base font-medium text-black dark:text-white animate-pulse">
          {text}
        </p>
      )}
    </div>
  </div>
);

// Create an inline loader component
export const InlineLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center space-x-3">
    <Loading variant="pulse" size="sm" />
    {text && (
      <span className="text-sm font-medium text-black dark:text-white">
        {text}
      </span>
    )}
  </div>
);

// Don't forget to add these animations to your tailwind.config.js
const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-reverse": "spin 2s linear infinite reverse",
      },
    },
  },
};

export default Loading;
