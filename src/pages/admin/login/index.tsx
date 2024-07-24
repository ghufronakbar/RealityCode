import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await axios.post("/api/admin/login", {
        password,
        email,
      });
      setIsOpen(true);
      setPassword("");
      setEmail("");
      setTimeout(() => {
        setIsOpen(false);
        router.push("/admin/dashboard");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
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
        <div className="ms-3 text-sm font-normal">Login Success</div>
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

  const ToastError = ({ errorMessage }: { errorMessage: string }) => {
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
        <div className="ms-3 text-sm font-normal">{errorMessage}</div>
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
    <section
      id="contact"
      className="bg-abstract-1 min-h-screen bg-cover text-center"
    >
      <ToastSuccess />
      <ToastError errorMessage={errorMessage} />
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded-3xl bg-opacity-10 backdrop-blur-lg">
        <h2 className="text-4xl font-bebas text-accent mb-8">Login as Admin</h2>
        <p className="text-lg mb-8">
          Reality Code is a project created by{" "}
          <a href="mailto:contact@realitycode.com" className="text-accent">
            @lanstheprodigy
          </a>
        </p>
        <div className="max-w-lg mx-auto">
          <div className="mb-4">
            <input
              placeholder="Your Email"
              type="email"
              className="w-full p-3 rounded-lg bg-secondary text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              className="w-full p-3 rounded-lg bg-secondary text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              handleLogin();
            }}
            className="bg-accent bg-opacity-30 text-white font-bold py-2 px-4 rounded-full backdrop-blur-lg shadow-xl transform transition-transform duration-300 hover:scale-105 mt-4"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
