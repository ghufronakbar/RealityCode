import React, { useEffect, useState } from "react";
import Link from "next/link";
import socialMedias from "@/data/socialMedia";
import { Post } from "@/models/Post";
import { Card, LoadingCard } from "@/components/ui/focus-card";
import Footer from "@/components/Footer";
import ModalPost from "@/components/ModalPost";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import getFavoritedPost from "@/services/post/getFavoritedPost";
import getKeyFavoritedPost from "@/services/post/getKeyFavoritedPost";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const SavedPostPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [keyFav, setKeyFav] = useState<string>("[]");
  const [search, setSearch] = useState<string>(
    (router.query.search as string) || ""
  );
  const [tempDelete, setTempDelete] = useState<Post[]>([]);

  const [filteredData, setFilteredData] = useState<Post[]>([]);

  useEffect(() => {
    if (router.isReady) {
      const key = getKeyFavoritedPost();
      setKeyFav(key);
    }
  }, [router.isReady]);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts/favorited/", keyFav],
    queryFn: () => getFavoritedPost(keyFav),
    refetchOnWindowFocus: false,
  });

  const handleUnBookmark = (id: number) => {
    const findUnBook = filteredData.find((post) => post.id === id);
    if (findUnBook) {
      setTempDelete([...tempDelete, findUnBook]);
      const newData = filteredData.filter((post) => post.id !== id);
      setFilteredData(newData);
    }
  };

  const handleBookmark = (id: number) => {
    const findBook = tempDelete.find((post) => post.id === id);
    if (findBook) {
      setFilteredData([...filteredData, findBook]);
      setTempDelete([...tempDelete.filter((post) => post.id !== id)]);
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredData(data.data);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    router.push({
      pathname: router.pathname,
      query: { search: e.target.value },
    });
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-white dark:bg-black px-1 sm:px-4 md:px-8 lg:px-14">
      <div className="flex flex-col w-full lg:w-1/3 h-full py-12 px-8">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          Saved Post
        </h1>
        <p className="text-xs lg:text-sm my-4 text-neutral-500 font-normal dark:text-neutral-300">
          Bookmark each post so you can easily find it later.
        </p>
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
        <div className="w-full mt-8">
          <PlaceholdersAndVanishInput
            placeholders={[
              "Search Here",
              "LearnWithReality",
              "JavaScript",
              "Rest API",
            ]}
            onChange={handleSearch}
            onSubmit={() => {}}
          />
        </div>
        <div className="text-xs lg:text-sm max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300 mt-8">
          See all posts{" "}
          <Link href="/post" prefetch={false} className="text-blue-500">
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
          {filteredData
            .filter((post) => post.title.toLowerCase().includes(search))
            .map((item, index) => (
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
        {!isLoading && !isFetching && filteredData.length === 0 && !isError && (
          <div className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            No favorited posts found
          </div>
        )}
        {!isLoading &&
          !isFetching &&
          filteredData.filter((post) =>
            post.title.toLowerCase().includes(search)
          ).length === 0 &&
          !isError && (
            <div className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
              No favorited posts found{" "}
              <span>
                with keyword{" "}
                <span className="font-semibold">&quot;{search}&quot;</span>
              </span>
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
            setTempDelete([]);
          }}
          onUnBookmark={() => handleUnBookmark(post.id)}
          onBookmark={() => handleBookmark(post.id)}
          post={post}
        />
      )}
    </div>
  );
};

export default SavedPostPage;
