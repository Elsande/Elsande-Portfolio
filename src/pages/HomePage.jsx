import Hero from "../sections/Hero";
import About from "../sections/About";
import Experience from "../sections/Experience";
import SelectedWork from "../sections/SelectedWork";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <SelectedWork />
      <Skills />
      <Contact />
    </>
  );
}
