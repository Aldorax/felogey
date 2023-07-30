"use client";
import Link from "next/link";
import React from "react";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Howto from "@/components/Howto";
// import Require from "@/components/Require";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="mt-10 text-black">
          <Hero />
          {/* <Services /> */}
          <Howto />
          {/* <Require /> */}
          <Footer />
        </div>
      </main>
    </div>
  );
}
