import HeroAbout from "./components/HeroAbout";
import DoesAbout from "./components/DoesAbout";
import WorksAbout from "./components/WorksAbout";
import TechAbout from "./components/TechAbout";
import CtaAbout from "./components/CtaAbout";



export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "5rem", // layout fix
      }}
    >

      {/* HERO */}
      <HeroAbout />

      {/* WHAT IT DOES */}
      <DoesAbout />

      {/* HOW IT WORKS */}
      <WorksAbout />

      {/* TECHNOLOGY */}
      <TechAbout />

      {/* CTA */}
      <CtaAbout />

    </div>
  );
}
