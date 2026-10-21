import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { Work } from "@/components/sections/work";
import { AiWorkflow } from "@/components/sections/ai-workflow";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { siteUrl } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  description: profile.description,
  worksFor: { "@type": "Organization", name: "Suiteify" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Acropolis Institute of Technology and Research" },
  knowsAbout: [
    "React Native",
    "Expo",
    "Next.js",
    "NestJS",
    "Node.js",
    "TypeScript",
    "Kotlin",
    "Swift",
    "GraphQL",
    "Agentic AI development",
  ],
  sameAs: [profile.links.linkedin, profile.links.github],
  hasOccupation: experience.map((e) => ({ "@type": "Occupation", name: `${e.role}, ${e.company}` })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Metrics />
      <Work />
      <AiWorkflow />
      <Services />
      <Process />
      <About />
      <Stack />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
