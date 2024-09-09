import { FaCommentDots, FaInfo } from "react-icons/fa";
import { FloatingNav } from "./ui/floating-navbar";
import { IoPerson, IoStar } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";

const Navbar = () => {
  return <FloatingNav navItems={navItems} />;
};

const navItems = [
  {
    name: "Home",
    link: "#hero",
    icon: <RiHome2Fill className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <FaInfo className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Features",
    link: "#features",
    icon: <IoStar className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Testimonials",
    link: "#testimonials",
    icon: (
      <FaCommentDots className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <IoPerson className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default Navbar;
