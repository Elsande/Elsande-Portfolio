import Reveal from "../components/Reveal";
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
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <SelectedWork />
      </Reveal>
      <Reveal>
        <Skills />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </>
  );
}
