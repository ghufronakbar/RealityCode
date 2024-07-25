import React, { useState } from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 bg-primary bg-opacity-50 backdrop-blur-lg w-full md:bg-opacity-0">
        <button
          onClick={toggleSidebar}
          className={`text-white focus:outline-none m-4  ${
            isOpen ? "hidden" : ""
          } `}
        >
          <svg
            className={`w-8 h-8 transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-secondary w-full md:w-1/3 bg-opacity-80 backdrop-blur-md`}
      >
        <div className="flex items-center justify-between p-4 bg-primary">
          <h2 className="text-white font-bebas text-3xl">Reality Code</h2>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            X
          </button>
        </div>
        <nav className="mt-5">
          <ul className="space-y-2">
            <li className="py-2 px-4 text-white">
              <Link href="/">Home</Link>
            </li>
            <li className="py-2 px-4 text-white">
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="py-2 px-4 text-white self-end bg-red-500 bg-opacity-30 backdrop-blur-lg p-2 fixed bottom-2 left-2 rounded-lg ">
              <Link href="/">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={`fixed inset-0 z-30 ${isOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
