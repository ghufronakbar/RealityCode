import React from "react";
import Link from "next/link";
import { useState } from "react";
import socialMedias from "@/data/socialMedia";
import description from "@/data/description";
import { Post } from "@/models/Post";
import { Card, FocusCards, LoadingCard } from "@/components/ui/focus-card";
import Footer from "@/components/Footer";
import ModalPost from "@/components/ModalPost";
import { useQuery } from "@tanstack/react-query";
import getAllPost from "@/services/post/getAllPost";

const PostPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPost(limit),
  });

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white dark:bg-black px-4 sm:px-10 md:px-12 lg:px-14">
      <div className="flex flex-col w-full lg:w-1/3 h-full py-12 px-4 overflow-auto hide-scroll">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          Reality Code
        </h1>
        <p
          className="text-xs lg:text-sm my-4  text-neutral-500 font-normal dark:text-neutral-300"
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
      <div className="flex flex-col w-full lg:w-2/3 items-center py-12 h-screen overflow-auto hide-scroll">
        <div className="w-full grid grid-cols-3 gap-4">
          {data &&
            !isError &&
            data.data.map((card, index) => (
              <Card
                key={index}
                card={card}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
                onClick={() => {
                  setIsOpen(true);
                  setPost(card);
                }}
              />
            ))}
          {isLoading || isFetching ? <LoadingCard count={6} /> : null}
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

const dummyDataPost: Post[] = [
  {
    id: 1,
    title:
      "Post PertamaPost PertamaPost PertamaPost PertamaPost PertamaPost PertamaPost PertamaPost PertamaPost PertamaPost Pertama",
    content:
      "Ini adalah post pertamaIni adalah post pertamaIni adalah post pertamaIni adalah post pertamaIni adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725976075/reality-code/message/ytauxWzK.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
      {
        id: 2,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
      {
        id: 3,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725976075/reality-code/message/ytauxWzK.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725978676/reality-code/message/C63FJFvj.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
  {
    id: 1,
    title: "Post Pertama",
    content: "Ini adalah post pertama",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    images: [
      {
        id: 1,
        url: "https://res.cloudinary.com/dga0wmldp/image/upload/v1725976075/reality-code/message/ytauxWzK.jpg",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      },
    ],
  },
];

export default PostPage;
