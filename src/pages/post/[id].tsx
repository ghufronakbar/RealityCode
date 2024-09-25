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
import formatContent from "@/utils/format/formatContent";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRouter } from "next/router";
import useDebounce from "@/utils/useDebounce";
import CountSocial from "@/components/CountSocial";
import { getAllSection } from "@/services/section";
import { Section, SubSection } from "@/models/Section";

const PostPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [limit, setLimit] = useState<number>(7);
  const [selectedSection, setSelectedSection] = useState<Section>({
    id: 0,
    title: "Loading...",
    description: "Loading...",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    subsections: [],
  });
  const [selectedSubSection, setSelectedSubSection] = useState<SubSection>({
    id: 0,
    sectionId: 0,
    title: "Loading...",
    description: "Loading...",
    thumbnail: "",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  });

  const [limitation, setLimitation] = useState<Limitation>({
    currentData: 0,
    totalData: 0,
  });
  const [search, setSearch] = useState<string>(
    (router.query.search as string) || ""
  );

  const {
    data: sections,
    isLoading: isLoadingSections,
    isFetching: isFetchingSections,
  } = useQuery({
    queryKey: ["section"],
    queryFn: () => getAllSection(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isLoadingSections && !isFetchingSections) {
      if (sections && sections.data.length > 0) {
        console.log(sections);
        const findSection = sections.data.find(
          (section: Section) =>
            section.subsections[0].sectionId === Number(router.query.id)
        );
        console.log(findSection);
        const findSubSection = findSection?.subsections.find(
          (subSection: SubSection) =>
            subSection.sectionId === Number(router.query.id)
        );

        console.log(findSubSection);
        if (findSubSection) {
          setSelectedSubSection(findSubSection);
        }
        if (findSection) {
          setSelectedSection(findSection);
        } else if (!findSection) {
          console.log("redirect");
          router.push("/post");
        }
      }
    }
  }, [sections, isLoadingSections, isFetchingSections, router.query.id]);

  const { id } = router.query as { id: string };

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["posts/page", limit, search],
    queryFn: () => getAllPost(limit, search, Number(id)),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    console.log(data, isError);
    if (isError) {
      router.push("/post");
    }
    if (data && data.limitation) {
      setLimitation(data.limitation);
    }
  }, [data, isError]);

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

  useDebounce(
    () => {
      setSearch((router.query.search as string) || "");
      refetch();
    },
    500,
    [router.query.search]
  );

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: e.target.value },
    });
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-white dark:bg-black px-1 sm:px-4 md:px-8 lg:px-14">
      <div className="flex flex-col w-full lg:w-1/3 h-full py-12 px-8">
        <h1 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          {selectedSubSection.title}
        </h1>
        <h2 className="text-xl lg:text-2xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white mt-2">
          {selectedSection.title}
        </h2>
        <CountSocial />
        <div className="flex flex-col gap-2 w-full my-4">
          <p className="text-xs lg:text-sm text-neutral-500 font-normal dark:text-neutral-300">
            {formatContent({ content: selectedSection.description })}
          </p>
          <p className="text-xs lg:text-sm text-neutral-500 font-normal dark:text-neutral-300">
            {formatContent({ content: selectedSubSection.description })}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-sm">Follow Us:</h4>
          <div className="flex flex-col gap-2">
            {socialMedias.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                className="text-sm text-black dark:text-white flex items-center gap-2 w-fit"
                prefetch={false}
                target="_blank"
              >
                {social.icon}
                <span>{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full mt-8">
          <PlaceholdersAndVanishInput
            placeholders={[
              "Search Here",
              "LearnWithReality",
              "JavaScript",
              "Rest API",
            ]}
            onChange={handleChangeSearch}
            onSubmit={() => {}}
          />
        </div>
        <div className="text-xs lg:text-sm max-w-2xl mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300 mt-8">
          See your saved posts{" "}
          <Link href="/post/saved" prefetch={false} className="text-blue-500">
            {" "}
            here{" "}
          </Link>
        </div>
        <div className="hidden lg:block w-full mt-2">
          <Footer />
        </div>
      </div>

      <div
        ref={scrollableDivRef}
        className="flex flex-col w-full lg:w-2/3 items-center lg:py-12 h-full lg:overflow-auto hide-scroll"
      >
        <div className="w-full grid grid-cols-3 gap-1 md-gap-2 lg:gap-4">
          {data &&
            !isError &&
            data.data.map((item, index) => (
              <Card
                key={item.images[0].url}
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
        {!isLoading &&
          !isFetching &&
          data &&
          data.data.length === 0 &&
          !isError &&
          search !== "" && (
            <div className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
              No posts found with keyword{" "}
              <span className="font-semibold">&quot;{search}&quot;</span>
            </div>
          )}
        {isError && <div className="text-red-500">Error loading posts</div>}
        <div className="lg:hidden block w-full mt-4">
          <Footer />
        </div>
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
