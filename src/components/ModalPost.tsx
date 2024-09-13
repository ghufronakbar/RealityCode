import { useState } from "react";
import { useToast } from "./ToastNotification";
import { Post } from "@/models/Post";
import { checkBookmark, processBookmark } from "@/services/bookmark";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import formatDate from "@/utils/format/formatDate";
import formatContent from "@/utils/format/formatContent";
interface ModalPostProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onBookmark?: () => void;
  onUnBookmark?: () => void;
}

const ModalPost = ({ isOpen, onClose, post, onBookmark, onUnBookmark }: ModalPostProps) => {
  const [indexImage, setIndexImage] = useState<number>(0);
  const { showToast } = useToast();
  const isAvailNext: boolean =
    indexImage !== post.images.length - 1 && post.images.length > 1;
  const isAvailPrev: boolean = indexImage !== 0 && post.images.length > 1;

  const handleNext = () => setIndexImage((indexImage + 1) % post.images.length);
  const handlePrev = () =>
    setIndexImage((indexImage - 1 + post.images.length) % post.images.length);

  const [isBoorkmarked, setIsBoorkmarked] = useState<boolean>(
    checkBookmark(post.id)
  );

  const handleBookmark = () => {
    processBookmark(post.id);
    setIsBoorkmarked(!isBoorkmarked);
    showToast(
      isBoorkmarked ? "Removed from bookmarks" : "Added to bookmarks",
      "info"
    );
  };

  if (!isOpen) return null;
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="w-[80%] h-[80%] bg-white dark:bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto flex flex-col lg:flex-row hide-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full aspect-1 relative">
          <Image
            src={post.images[indexImage].url}
            alt={post.title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {isAvailNext && (
            <IoIosArrowForward
              className="text-3xl absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-300 hover:scale-110 transition-all duration-300 drop-shadow-2xl"
              onClick={handleNext}
            />
          )}
          {isAvailPrev && (
            <IoIosArrowBack
              className="text-3xl absolute top-1/2 left-0 transform translate-x-1/2 -translate-y-1/2  cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-300 hover:scale-110 transition-all duration-300 drop-shadow-2xl"
              onClick={handlePrev}
            />
          )}
        </div>
        <div className="w-full h-full lg:overflow-auto p-4 lg:p-6 hide-scroll flex flex-col">
          <h1 className="text-2xl lg:text-3xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
            {post.title}
          </h1>
          <span
            className="flex items-center gap-2 self-end mt-4 cursor-pointer"
            onClick={handleBookmark}
          >
            {isBoorkmarked ? (
              <GoBookmarkFill className="w-6 h-6" onClick={onUnBookmark} />
            ) : (
              <GoBookmark className="w-6 h-6" onClick={onBookmark} />
            )}
          </span>
          <p className="text-xs lg:text-sm my-4  font-normal ">
            {formatContent({ content: post.content, onClick: onClose })}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            Posted on {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
