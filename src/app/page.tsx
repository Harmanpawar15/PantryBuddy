

"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeautredItems from "../components/FeautredItems";
import LandingPage from "../components/LandingPage"; 
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkAuthStatus = () => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
      };
      checkAuthStatus();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/'); // Ensure user is navigated to the home page after login
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LandingPage />; // Render the LandingPage component if not authenticated
  }

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="relative w-full flex items-center justify-center">
        <Navbar /> {/* Render the Navbar if authenticated */}
      </div>
      <HeroSection />
      <FeautredItems />
    </main>
  );
}




