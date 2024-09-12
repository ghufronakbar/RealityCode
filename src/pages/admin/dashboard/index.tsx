import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ToastNotification";
import LayoutDashboard from "@/components/LayoutDashboard";
import getOverviewWithCache from "@/services/overview/getOverviewWithCache";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaBookmark, FaHeart, FaThreads, FaWebAwesome } from "react-icons/fa6";
import Image from "next/image";
import Button from "@/components/Button";
import { IoMdRefresh } from "react-icons/io";
import getOverviewWithoutCache from "@/services/overview/getOverviewWithoutCache";
import withAuth from "@/utils/withAuth";

interface DataSocial {
  instagram: number;
  tiktok: number;
  threads: number;
  likes: number;
  posts: number;
}
const initData: DataSocial = {
  instagram: 0,
  tiktok: 0,
  threads: 0,
  likes: 0,
  posts: 0,
};

const DashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [dataSocial, setDataSocial] = useState<DataSocial>(initData);

  const [displaySocial, setDisplaySocial] = useState<DataSocial>(initData);

  const { data, isError } = useQuery({
    queryKey: ["socialmedia/overviews/admin"],
    queryFn: () => getOverviewWithCache(),
    refetchOnWindowFocus: false,
  });

  const animateCounting = (target: number, key: keyof typeof displaySocial) => {
    let start = displaySocial[key];
    if (start === target) return;

    const duration = 1000;
    const increment = (target - start) / (duration / 50);

    const interval = setInterval(() => {
      start += increment;
      if (
        (increment > 0 && start >= target) ||
        (increment < 0 && start <= target)
      ) {
        start = target;
        clearInterval(interval);
      }
      setDisplaySocial((prev) => ({ ...prev, [key]: Math.round(start) }));
    }, 50);
  };

  useEffect(() => {
    if (data) {
      const newSocialData = {
        instagram: data.data.instagram.followers,
        tiktok: data.data.tiktok.followers,
        threads: data.data.threads.followers,
        likes: data.data.tiktok.like,
        posts: data.data.tiktok.post,
      };
      setDataSocial(newSocialData);

      Object.keys(newSocialData).forEach((key) => {
        const typedKey = key as keyof typeof displaySocial;
        animateCounting(newSocialData[typedKey], typedKey);
      });
    }
  }, [data]);

  useEffect(() => {
    const handleFocus = () => {
      Object.keys(dataSocial).forEach((key) => {
        const typedKey = key as keyof typeof dataSocial;
        animateCounting(dataSocial[typedKey], typedKey);
      });
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [dataSocial]);

  if (isError) {
    setDisplaySocial({
      instagram: 10,
      tiktok: 32,
      threads: 325,
      likes: 313,
      posts: 20,
    });
  }

  const Background = ({ children }: { children?: React.ReactNode }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center text-3xl md:text-6xl lg:leading-tight tracking-tight text-black dark:text-white font-bold">
      {children}
    </div>
  );
  const items = [
    {
      title: "Instagram",
      description: "Followers on Instagram",
      header: <Background>{displaySocial.instagram}</Background>,
      icon: <FaInstagram className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Threads",
      description: "Followers on Threads",
      header: <Background>{displaySocial.threads}</Background>,
      icon: <FaThreads className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Tiktok",
      description: "Followers on Tiktok",
      header: <Background>{displaySocial.tiktok}</Background>,
      icon: <FaTiktok className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Reality Code",
      description:
        "A platform to learn about technology and coding available on various platforms such as Instagram, TikTok, Threads and the Web.",
      header: (
        <Image
          src={"/logo.jpg"}
          alt="Reality Code Logo"
          width={1200}
          height={1200}
          priority
          className="w-full h-auto min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center text-3xl md:text-6xl lg:leading-tight tracking-tight text-black dark:text-white font-bold object-cover"
        />
      ),
      icon: <FaWebAwesome className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Posts",
      description: "Total posts on Instagram, Threads, and Tiktok.",
      header: <Background>{displaySocial.posts}</Background>,
      icon: <FaBookmark className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Likes",
      description: "Total likes on Tiktok.",
      header: <Background>{displaySocial.likes}</Background>,
      icon: <FaHeart className="h-4 w-4 text-neutral-500" />,
    },
  ];
  const handleRefresh = async () => {
    showToast("Refreshing...", "info");
    const res = await getOverviewWithoutCache();
    showToast("Refreshed", "success");
    const newSocialData = {
      instagram: res.data.instagram.followers,
      tiktok: res.data.tiktok.followers,
      threads: res.data.threads.followers,
      likes: res.data.tiktok.like,
      posts: res.data.tiktok.post,
    };
    setDataSocial(newSocialData);
    setDisplaySocial(initData);
    setTimeout(() => {
      Object.keys(newSocialData).forEach((key) => {
        const typedKey = key as keyof typeof displaySocial;
        animateCounting(newSocialData[typedKey], typedKey);
      });
    }, 100);
  };

  useEffect(() => {
    if (
      Object.values(displaySocial).every((value) => value === 0) &&
      dataSocial.instagram > 0
    ) {
      Object.keys(dataSocial).forEach((key) => {
        const typedKey = key as keyof typeof displaySocial;
        animateCounting(dataSocial[typedKey], typedKey);
      });
    }
  }, [displaySocial, dataSocial]);
  return (
    <Sidebar>
      <LayoutDashboard
        title="Overview"
        childrenHeader={
          <Button onClick={handleRefresh}>
            <IoMdRefresh />
          </Button>
        }
      >
        <BentoGrid className="w-full">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </LayoutDashboard>
    </Sidebar>
  );
};

export default withAuth(DashboardPage);
