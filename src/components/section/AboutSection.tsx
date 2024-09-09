import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `Reality Code is dedicated to delivering high-quality software
            solutions that drive success for our clients. Our team of experts
            works tirelessly to stay at the forefront of technology, ensuring that
            we provide innovative and effective solutions for every project.`;
function AboutSection() {
  return (
    <section id="about" className="py-64 px-8 md:px-12 lg:px-14 xl:px-16 text-center">
      <div className="container mx-auto">
        <TextGenerateEffect words={words} />
        <p className="text-black dark:text-white mt-4">- Reality Code</p>
      </div>
    </section>
  );
}

export default AboutSection;
