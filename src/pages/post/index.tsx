import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import socialMedias from "@/data/socialMedia";
import description from "@/data/description";
import { Post } from "@/models/Post";
import { Card, LoadingCard } from "@/components/ui/focus-card";
import Footer from "@/components/Footer";
import ModalPost from "@/components/ModalPost";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getAllPost from "@/services/post/getAllPost";
import { Limitation } from "@/models/Limitation";

const PostPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [limit, setLimit] = useState<number>(7);
  const [limitation, setLimitation] = useState<Limitation>({
    currentData: 0,
    totalData: 0,
  });

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts/page", limit],
    queryFn: () => getAllPost(limit),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && data.limitation) {
      setLimitation(data.limitation);
    }
  }, [data]);

  const handleScroll = () => {
    const scrollableDiv = scrollableDivRef.current;

    if (scrollableDiv) {
      const scrollTop = scrollableDiv.scrollTop;
      const scrollHeight = scrollableDiv.scrollHeight;
      const clientHeight = scrollableDiv.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        limitation.currentData < limitation.totalData &&
        !isLoading &&
        !isFetching
      ) {
        setLimit((prevLimit) => prevLimit + 5);
      }
    }
  };

  const handleWindowScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 50 &&
      limitation.currentData < limitation.totalData &&
      !isLoading &&
      !isFetching
    ) {
      setLimit((prevLimit) => prevLimit + 5);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const scrollableDiv = scrollableDivRef.current;

    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        if (scrollableDiv) {
          scrollableDiv.addEventListener("scroll", handleScroll);
        }
        window.removeEventListener("scroll", handleWindowScroll);
      } else {
        // Mobile mode, attach scroll listener to window
        window.addEventListener("scroll", handleWindowScroll);
        if (scrollableDiv) {
          scrollableDiv.removeEventListener("scroll", handleScroll);
        }
      }
    };

    if (mediaQuery.matches) {
      if (scrollableDiv) {
        scrollableDiv.addEventListener("scroll", handleScroll);
      }
    } else {
      window.addEventListener("scroll", handleWindowScroll);
    }

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleWindowScroll);
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [limitation, isLoading, isFetching]);

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-white dark:bg-black px-4 sm:px-10 md:px-12 lg:px-14">
      <div className="flex flex-col w-full lg:w-1/3 h-full py-12 px-4">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          Reality Code
        </h1>
        <p
          className="text-xs lg:text-sm my-4 text-neutral-500 font-normal dark:text-neutral-300"
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, "<br />"),
          }}
        ></p>
        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-sm mt-8">Follow Us:</h4>
          <div className="flex flex-col gap-2">
            {socialMedias.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                className="text-sm text-black dark:text-white flex items-center gap-2"
                prefetch={false}
                target="_blank"
              >
                {social.icon}
                <span>{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>

      <div
        ref={scrollableDivRef}
        className="flex flex-col w-full lg:w-2/3 items-center py-12 h-full lg:overflow-auto hide-scroll"
      >
        <div className="w-full grid grid-cols-3 gap-4">
          {data &&
            !isError &&
            data.data.map((item, index) => (
              <Card
                key={index}
                card={item}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
                onClick={() => {
                  setIsOpen(true);
                  setPost(item);
                }}
              />
            ))}
          {isLoading || isFetching ? <LoadingCard count={5} /> : null}
        </div>
        {isError && <div className="text-red-500">Error loading posts</div>}
      </div>

      {post && (
        <ModalPost
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setPost(null);
          }}
          post={post}
        />
      )}
    </div>
  );
};

export default PostPage;
