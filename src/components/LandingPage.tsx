"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden  bg-neutral-900">
      <ShootingStars />
      <StarsBackground />
      <div className="max-w-md w-full mx-auto rounded-lg p-8 shadow-lg bg-white dark:bg-black relative z-10 text-center">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Pantry Buddy
        </h2>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Manage your pantry with ease and convenience.
        </p>
        <div className="flex flex-col space-y-4 mt-8">
          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
