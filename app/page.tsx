import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Hero from "../components/home/Hero";
import Howto from "@/components/home/Howto";
import Footer from "@/components/home/Footer";
import TabswithForm from "@/components/forms/TabsWithForm";

export default function Home() {
  return (
    // <section className="flex flex-col items-center justify-center gap-4 md:py-10">
    <div>
      <Hero />
      <Howto />
      <Footer />
    </div>
    // {/* </section> */}
  );
}
