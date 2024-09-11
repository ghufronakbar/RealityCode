import { CustomButton } from "@/components/section/HeroSection";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        <Highlight className="text-black dark:text-white">404</Highlight> What
        are you looking for?
      </motion.h1>
      <p className="text-sm lg:text-base max-w-2xl my-8 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
        Maybe you&apos;d like to go there?
      </p>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2">
        <CustomButton href="/link-tree">Link Tree</CustomButton>
        <CustomButton href="/">Return to Home</CustomButton>
        <CustomButton href="/post">See Posts</CustomButton>
      </div>
    </HeroHighlight>
  );
};

export default NotFoundPage;
