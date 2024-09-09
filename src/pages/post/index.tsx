import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";

const PostPage = () => {
  const [limit, setLimit] = useState(3);
//   const { data, isError, isLoading, isFetching } = useQuery({
//     queryKey: ["links", limit],
//     queryFn: () => getLinks(limit),
//     refetchOnWindowFocus: false,
//     staleTime: 1000 * 60 * 60,
//   });

  return (
    <div className="flex min-h-screen flex-col bg-abstract-1 bg-cover bg-fixed">
        <div className="container self-center bg-black">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat self-start text-white text-center">
            Reality Code
          </h1>      
        </div>
    </div>
  );
};

export default PostPage;
