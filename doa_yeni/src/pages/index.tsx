import { Inter } from "next/font/google";
import Banner from "~/components/banner";
import Features from "~/components/features";
import FeaturesBlocks from "~/components/features-blocks";
import Hero from "~/components/hero";
import Newsletter from "~/components/newsletter";
import Testimonials from "~/components/testimonials";
import Header from "~/components/ui/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function Landing() {
  return (
    <div
      className={`${inter.variable} font-inter bg-white tracking-tight text-gray-900 antialiased`}
    >
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        <main className="grow">
          <Hero />
          <Features />
          <FeaturesBlocks />
          {/* <Testimonials /> */}
          <Newsletter />
        </main>
        <Banner />
      </div>
    </div>
  );
}
