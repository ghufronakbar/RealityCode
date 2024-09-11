import React, { useEffect, useState } from "react";
import Link from "next/link";
import socialMedias from "@/data/socialMedia";
import { Post } from "@/models/Post";
import { Card, LoadingCard } from "@/components/ui/focus-card";
import Footer from "@/components/Footer";
import ModalPost from "@/components/ModalPost";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import getFavoritedPost from "@/services/post/getFavoritedPost";
import getKeyFavoritedPost from "@/services/post/getKeyFavoritedPost";

const SavedPostPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [keyFav, setKeyFav] = useState<string>("[]");
  const router = useRouter();

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
    placeholderData: keepPreviousData,
  });

  const handleUnBookmark = (id: number) => {
    if (data) {
      const findUnBook = data?.data?.find((post) => post.id === id);
      if (findUnBook) {
        data?.data?.splice(data?.data?.indexOf(findUnBook), 1);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-white dark:bg-black px-4 sm:px-10 md:px-12 lg:px-14">
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
        <div className="text-xs lg:text-sm max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300 mt-12">
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

      <div className="flex flex-col w-full lg:w-2/3 items-center py-12 h-full lg:overflow-auto hide-scroll">
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
        {!isLoading &&
          !isFetching &&
          data &&
          data.data.length === 0 &&
          !isError && (
            <div className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
              No favorited posts found
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
          onUnBookmark={() => handleUnBookmark(post.id)}
          post={post}
        />
      )}
    </div>
  );
};

export default SavedPostPage;
