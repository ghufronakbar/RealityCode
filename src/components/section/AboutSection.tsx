import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `Reality Code is a learning platform dedicated to helping you master the world of technology and coding through an interactive, practical, and relevant approach with up-to-date materials, real case studies, and a supportive community, ensuring you not only learn theory, but also master coding skills that are immediately applicable in the ever-evolving digital age.`;

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-64 px-8 md:px-12 lg:px-14 xl:px-16 text-center"
    >
      <div className="container mx-auto">
        <TextGenerateEffect words={words} />
        {/* <p className="text-black dark:text-white mt-4">- Reality Code</p> */}
      </div>
    </section>
  );
};

export default AboutSection;
