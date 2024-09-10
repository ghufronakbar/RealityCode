"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Post } from "@/models/Post";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
  }: {
    card: Card;
    index: number;
    onClick?: () => void;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "cursor-pointer rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden aspect-1 object-cover w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.images[0].url}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 line-clamp-2">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = Post;

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </>
  );
}

export const LoadingCard = ({ count }: { count: number }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-lg relative dark:bg-neutral-900 overflow-hidden aspect-1 object-cover w-full transition-all duration-300 ease-out blur-sm scale-[0.98] animate-pulse bg-gray-300 dark:bg-black/50"
          )}
        >
          <div className="bg-gray-300 dark:bg-neutral-900 object-cover absolute inset-0" />
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300 opacity-0"
            )}
          >
            <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 line-clamp-2">
              Loading...
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
