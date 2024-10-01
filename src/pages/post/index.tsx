import React, { useEffect, useState } from "react";
import Link from "next/link";
import socialMedias from "@/data/socialMedia";
import description from "@/data/description";
import { Card, LoadingCard } from "@/components/ui/focus-card-section";
import Footer from "@/components/Footer";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import formatContent from "@/utils/format/formatContent";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRouter } from "next/router";
import CountSocial from "@/components/CountSocial";
import { getAllSection } from "@/services/section";
import { Section, SubSection } from "@/models/Section";

const PostPage = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const [subSection, setSubSection] = useState<SubSection[]>([]);
  const [search, setSearch] = useState<string>(
    (router.query.search as string) || ""
  );

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["section"],
    queryFn: () => getAllSection(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      const filteredSubSections = data.data.reduce(
        (acc: SubSection[], section: Section) => {
          return [...acc, ...section.subsections];
        },
        []
      );

      setSubSection(filteredSubSections);
    }
  }, [data]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: e.target.value },
    });
    setSearch(e.target.value);
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-white dark:bg-black px-1 sm:px-4 md:px-8 lg:px-14">
      <div className="flex flex-col w-full lg:w-1/3 h-full py-12 px-8">
        <h1 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          Reality Code
        </h1>
        <CountSocial />
        <p className="text-xs lg:text-sm my-4 text-neutral-500 font-normal dark:text-neutral-300">
          {formatContent({ content: description })}
        </p>
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
            onChange={(e) => handleChangeSearch(e)}
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

      <div className="flex flex-col w-full lg:w-2/3 items-center lg:py-12 h-full lg:overflow-auto hide-scroll">
        <div className="w-full grid grid-cols-3 gap-1 md-gap-2 lg:gap-4">
          {!isFetching &&
            !isLoading &&
            subSection
              .filter((item) => item.title.includes(search))
              .map((item, index) => (
                <Link
                  href={`/post/${item.id}`}
                  prefetch={false}
                  key={" link subsection " + item.id}
                >
                  <Card
                    key={"thumbnail subsection " + item.id}
                    card={item}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                  />
                </Link>
              ))}
          {isLoading || isFetching ? <LoadingCard count={5} /> : null}
        </div>

        {isError && <div className="text-red-500">Error loading posts</div>}
        {!isFetching &&
          !isLoading &&
          subSection.filter((item) => item.title.includes(search)).length ===
            0 &&
          !isError &&
          search !== "" && (
            <div className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
              No section found with keyword{" "}
              <span className="font-semibold">&quot;{search}&quot;</span>
            </div>
          )}

        <div className="lg:hidden block w-full mt-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
