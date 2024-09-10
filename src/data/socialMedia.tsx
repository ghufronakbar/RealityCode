import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";

interface SocialMedia {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialMedias: SocialMedia[] = [
  {
    name: "Twitter",
    url: "https://twitter.com/reality.code",
    icon: <FaXTwitter />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/reality.code",
    icon: <FaInstagram />,
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@reality.code",
    icon: <FaTiktok />,
  },
  {
    name: "Threads",
    url: "https://threads.net/reality.code",
    icon: <FaThreads />,
  },
];

export default socialMedias;
