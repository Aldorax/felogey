"use client";
import Link from "next/link";
import React from "react";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-green-900">
        <div className="mt-10 text-black">
          <Hero />
          <Services />
          <Footer />
        </div>
      </main>
    </div>
  );
}
