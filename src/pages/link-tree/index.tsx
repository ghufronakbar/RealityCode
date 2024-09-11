"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/useOutsideClick";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import getLink from "@/services/link/getLink";
import { LinkTree } from "@/models/LinkTree";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<LinkTree[][number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["link-tree"],
    refetchOnWindowFocus: false,
    queryFn: () => getLink(),
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (isFetching || isLoading)
    return (
      <div className="h-full flex flex-col gap-2 flex-1 w-full items-center">
        {[...new Array(5)].map((i) => (
          <div
            key={"second-array" + i}
            className="rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse w-full max-w-[500px] h-full max-h-[90%]"
          ></div>
        ))}
      </div>
    );

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-fit max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={600}
                  height={600}
                  src={active.icon}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.desc}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.desc}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.url}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {/* {active.ctaText} */}
                    Visit
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {data && (
        <ul className="max-w-2xl mx-auto w-full gap-4">
          {data.data.map((item, index) => (
            <motion.div
              layoutId={`card-${item.title}-${id}`}
              key={`card-${item.title}-${id}`}
              onClick={() => setActive(item)}
              className="p-4 flex flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-row ">
                <motion.div layoutId={`image-${item.title}-${id}`}>
                  <Image
                    width={100}
                    height={100}
                    src={item.icon}
                    alt={item.title}
                    className="h-14 w-14 rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="">
                  <motion.h3
                    layoutId={`title-${item.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-left"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${item.desc}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-left"
                  >
                    {item.desc}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${item.title}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-0"
              >
                Visit
              </motion.button>
            </motion.div>
          ))}
        </ul>
      )}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const LinkTreePage = () => {
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
        className="flex flex-col md:flex-row w-full h-screen gap-4 mx-auto overflow-auto py-20 hide-scroll"
      >
        <div className="w-full md:w-1/3 md:h-full">
          <h2 className="text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white my-12 hide-scroll">
            Link Tree
          </h2>
          <div className="hidden md:block">
            <Footer />
          </div>
        </div>
        <div className="w-full md:w-2/3 h-full px-2 md:px-4 lg:px-8 xl:px-12">
          <div className="w-full h-[90%] md:overflow-auto hide-scroll">
            <ExpandableCardDemo />
            <div className="md:hidden block">
              <Footer />
            </div>
          </div>
          <div className="w-full h-[10%] hidden md:flex justify-center">
            <span className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
              Scroll to see more
            </span>
          </div>
        </div>
      </motion.h1>
    </HeroHighlight>
  );
};

export default LinkTreePage;
