import HeroHome from "./components/HeroHome";
import MarqueeStrip from "./components/MarqueeStrip";
import StatsHome from "./components/StatsHome";
import EventsHome from "./components/EventsHome";
import WorksHome from "./components/WorksHome";
import FeaturesHome from "./components/FeaturesHome";
import CTAHome from "./components/CTAHome";


export default function HomePage() {
  

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/*  HERO */}
      <HeroHome/>

      {/* MARQUEE */}
      <MarqueeStrip />

      {/* STATS */}
      <StatsHome />

      {/* EVENTS */}
      <EventsHome />

      {/*  HOW IT WORKS */}
     <WorksHome />

      {/*  FEATURES */}
      <FeaturesHome />

      {/*  CTA */}
      <CTAHome />
    </div>
  );
}
