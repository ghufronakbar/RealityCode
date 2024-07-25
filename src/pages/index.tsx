import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <main className="bg-primary min-h-screen text-white font-montserrat overflow-x-hidden">
        <Header />
        <Hero />
        <Features />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleSmoothScroll = (e: any) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setIsVisible(false);
        } else {
          // if scroll up show the navbar
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY); // remember current page location to use in the next move
      }
    };

    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-abstract-1 bg-cover bg-fixed shadow-lg fixed w-full z-40 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-12 h-12"
          />
          <h1 className="text-3xl font-bebas text-accent">Reality Code</h1>
        </div>

        <nav className="hidden md:flex">
          <a href="#features" className="text-white hover:text-accent ml-4">
            Features
          </a>
          <a href="#about" className="text-white hover:text-accent ml-4">
            About
          </a>
          <a href="#testimonials" className="text-white hover:text-accent ml-4">
            Testimonials
          </a>
          <a href="#contact" className="text-white hover:text-accent ml-4">
            Contact
          </a>
        </nav>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-secondary text-white absolute w-full left-0 top-full">
          <a href="#features" className="block px-6 py-2 hover:bg-accent">
            Features
          </a>
          <a href="#about" className="block px-6 py-2 hover:bg-accent">
            About
          </a>
          <a href="#testimonials" className="block px-6 py-2 hover:bg-accent">
            Testimonials
          </a>
          <a href="#contact" className="block px-6 py-2 hover:bg-accent">
            Contact
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-abstract-1 bg-cover bg-fixed text-center py-20 ">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-bebas mb-4 mt-24">
          Welcome to Reality Code
        </h2>
        <p className="text-xl mb-8">
          Transforming ideas into reality with cutting-edge code solutions
        </p>
        <a
          href="#features"
          className="bg-accent bg-opacity-30 text-white font-bold py-2 px-4 rounded-full backdrop-blur-lg shadow-xl transform transition-transform duration-300 hover:scale-110"
        >
          Order Now
        </a>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 bg-abstract-1 bg-cover bg-fixed">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bebas text-center mb-12 text-accent">
          Features
        </h2>
        <div className="flex flex-wrap ">
          <FeatureCard
            title="Innovative Solutions"
            description="We provide innovative coding solutions to solve complex problems."
          />
          <FeatureCard
            title="Expert Team"
            description="Our team consists of experts with years of experience in the industry."
          />
          <FeatureCard
            title="Customer Focused"
            description="We prioritize our customers and tailor our solutions to meet their needs."
          />
          <FeatureCard
            title="Scalable Solutions"
            description="Our solutions are designed to grow with your business."
          />
          <FeatureCard
            title="Continuous Support"
            description="We offer continuous support to ensure your success."
          />
          <FeatureCard
            title="Advanced Technologies"
            description="We utilize the latest technologies to provide cutting-edge solutions."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 hover:scale-105 transition-transform duration-300 mx-2 md:mx-0">
      <div className="bg-primary p-6 rounded-lg shadow-lg h-full">
        <h3 className="text-2xl font-bebas mb-2 text-accent">{title}</h3>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-20 bg-tertiary text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bebas text-accent mb-8">About Us</h2>
        <p className="text-lg max-w-2xl mx-auto px-4">
          Reality Code is dedicated to delivering high-quality software
          solutions that drive success for our clients. Our team of experts
          works tirelessly to stay at the forefront of technology, ensuring that
          we provide innovative and effective solutions for every project.
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-abstract-1 bg-cover bg-fixed text-center"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bebas text-accent mb-8">Testimonials</h2>
        <div className="flex flex-wrap ">
          <TestimonialCard
            name="John Doe"
            feedback="Reality Code transformed our vision into reality with their exceptional coding skills and innovative solutions."
          />
          <TestimonialCard
            name="Jane Smith"
            feedback="The team at Reality Code is outstanding! They delivered a high-quality product on time and exceeded our expectations."
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  feedback,
}: {
  name: string;
  feedback: string;
}) {
  return (
    <div className="w-full md:w-1/2 px-4 mb-8 hover:scale-105 transition-transform duration-300 mx-2 md:mx-0">
      <div className="bg-primary p-6 rounded-lg shadow-lg">
        <p className="text-white mb-4">&quot;{feedback}&quot;</p>
        <h4 className="text-accent font-bebas">{name}</h4>
      </div>
    </div>
  );
}

function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!name || !email || !message) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }
    try {
      await axios.post("/api/message", {
        name,
        email,
        message,
      });
      setIsOpen(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const ToastSuccess = () => {
    return (
      <div
        id="toast-default"
        className={
          isOpen
            ? `flex items-center w-full max-w-xs p-4 rounded-lg shadow text-gray-400 bg-gray-800 fixed z-50  top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-opacity-20 backdrop-blur-lg`
            : "hidden"
        }
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-blue-800 text-blue-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal">
          Your message has been sent.
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
          data-dismiss-target="#toast-default"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"              
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    );
  };

  const ToastError = () => {
    return (
      <div
        id="toast-default"
        className={
          isError
            ? `flex items-center w-full max-w-xs p-4 rounded-lg shadow text-gray-400 bg-gray-800 fixed z-50  top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-opacity-20 backdrop-blur-lg`
            : "hidden"
        }
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-orange-700 text-orange-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal">Please fill the form.</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
          data-dismiss-target="#toast-default"
          aria-label="Close"
          onClick={() => setIsError(false)}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <section id="contact" className="py-20 px-6 bg-tertiary text-center">
      <ToastSuccess />
      <ToastError />     
      <div className="container mx-auto">
        <h2 className="text-4xl font-bebas text-accent mb-8">Contact Us</h2>
        <p className="text-lg mb-8">
          Have questions? Reach out to us at{" "}
          <a href="mailto:contact@realitycode.com" className="text-accent">
            contact@realitycode.com
          </a>
        </p>
        <div className="max-w-lg mx-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-secondary text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input              
              placeholder="Your Email or Phone Number"
              className="w-full p-3 rounded-lg bg-secondary text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-secondary text-white"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={() => {
              handleSendMessage();
            }}
            className="bg-accent text-white font-bold py-2 px-4 rounded-full backdrop-blur-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Reality Code. All rights reserved.</p>
      </div>
    </footer>
  );
}
