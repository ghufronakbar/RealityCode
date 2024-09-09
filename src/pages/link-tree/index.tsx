import NotificationLoading from "@/components/loading/NotificationLoading";
import getLinks from "@/features/link/getLink";
import { LinkTree } from "@/models/LinkTree";
import formatDateTime from "@/utils/format/formatDateTime";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";

const LinkTreePage = () => {
  const [limit, setLimit] = useState(3);
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["links", limit],
    queryFn: () => getLinks(limit),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-abstract-1 bg-cover bg-fixed px-2 py-32">
      <div className="relative z-10 max-w-md w-full items-center justify-center flex h-fit flex-col  rounded-3xl px-4 md:px-8 py-10  transform-gpu transition-transform duration-300 md:hover:scale-105">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat self-start text-white">
            Reality Code
          </h1>
          <div className="w-full flex flex-col gap-4">
            {isFetching || isLoading ? (
              <>
                <NotificationLoading />
                <NotificationLoading />
                <NotificationLoading />
              </>
            ) : isError ? (
              <div className="text-white font-montserrat text-lg">
                Error Getting Links :(
              </div>
            ) : data && data.data?.length > 0 ? (
              data.data.map((link: LinkTree) => (
                <Link href={link.url} key={link.id} target="_blank">
                  <div className="relative w-full px-4 py-5 rounded-3xl bg-black bg-opacity-40 backdrop-blur-lg shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl notification">
                    <div className="w-full flex items-center gap-4">
                      <Image
                        src={link.icon}
                        alt={link.title}
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="text-white font-montserrat text-md md:text-lg line-clamp-1 font-semibold notification-hover:line-clamp-none max-w-[200px] w-full transition-all duration-300">
                            {link.title}
                          </div>
                          <div className="text-gray-200 font-montserrat text-xs line-clamp-1">
                            {formatDateTime(link.updatedAt)}
                          </div>
                        </div>
                        <div className="text-gray-200 font-montserrat text-sm md:text-sm line-clamp-3 notification-hover:line-clamp-none transition-all duration-300">
                          {link.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <></>
            )}
            {data && data.limitation.limit < data.limitation.totalData && (
              <button
                className="relative w-fit h-fit rounded-full bg-black bg-opacity-40 backdrop-blur-lg mx-auto my-4 flex items-center justify-center pl-3 pr-1 py-1 self-end shadow-xl transform transition-transform duration-300 hover:scale-105"
                onClick={() => {
                  setLimit(limit + 3);
                }}
              >
                <div className="text-white font-montserrat text-sm">
                  Show More
                </div>
                <MdNavigateNext className="text-white w-6 h-auto rotate-90" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkTreePage;
