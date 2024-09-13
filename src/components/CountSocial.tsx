import getOverviewWithCache from "@/services/overview/getOverviewWithCache";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface DataSocial {
  instagram: number;
  tiktok: number;
  threads: number;
  likes: number;
}

const initData: DataSocial = {
  instagram: 0,
  tiktok: 0,
  threads: 0,
  likes: 0,
};

const CountSocial = () => {
  const [dataSocial, setDataSocial] = useState<DataSocial>(initData);

  const [displaySocial, setDisplaySocial] = useState<DataSocial>(initData);

  // const { data, isError } = useQuery({
  //   queryKey: ["socialmedia/overviews"],
  //   queryFn: () => getOverviewWithCache(),
  //   refetchOnWindowFocus: false,
  // });

  const fetchData = async () => {
    try {
      const data = await getOverviewWithCache();
      setDataSocial({
        instagram: data.data.instagram.followers,
        tiktok: data.data.tiktok.followers,
        threads: data.data.threads.followers,
        likes: data.data.tiktok.like,
      });
    } catch (error) {
      setDataSocial({
        instagram: 10,
        tiktok: 32,
        threads: 325,
        likes: 313,
      });
    }
  };
  useEffect(() => {
    fetchData();
  },[])

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

  // useEffect(() => {
  //   if (data) {
  //     const newSocialData = {
  //       instagram: data.data.instagram.followers,
  //       tiktok: data.data.tiktok.followers,
  //       threads: data.data.threads.followers,
  //       likes: data.data.tiktok.like,
  //     };
  //     setDataSocial(newSocialData);

  //     Object.keys(newSocialData).forEach((key) => {
  //       const typedKey = key as keyof typeof displaySocial;
  //       animateCounting(newSocialData[typedKey], typedKey);
  //     });
  //   }
  // }, [data]);

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

  // if (isError) {
  //   setDisplaySocial({
  //     instagram: 10,
  //     tiktok: 32,
  //     threads: 325,
  //     likes: 313,
  //   });
  // }

  return (
    <div className="w-full grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 mt-6 mb-2">
      <div className="w-full flex flex-col items-center">
        <p className="text-xl md:text-3xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          {displaySocial.instagram}
        </p>
        <p className="text-xs text-neutral-500 font-normal dark:text-neutral-300 text-center">
          Instagram
        </p>
      </div>
      <div className="w-full flex flex-col items-center">
        <p className="text-xl md:text-3xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          {displaySocial.tiktok}
        </p>
        <p className="text-xs text-neutral-500 font-normal dark:text-neutral-300 text-center">
          Tiktok
        </p>
      </div>
      <div className="w-full flex flex-col items-center">
        <p className="text-xl md:text-3xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          {displaySocial.threads}
        </p>
        <p className="text-xs text-neutral-500 font-normal dark:text-neutral-300 text-center">
          Threads
        </p>
      </div>
      <div className="w-full flex flex-col items-center">
        <p className="text-xl md:text-3xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          {displaySocial.likes}
        </p>
        <p className="text-xs text-neutral-500 font-normal dark:text-neutral-300 text-center">
          Likes
        </p>
      </div>
    </div>
  );
};

export default CountSocial;
