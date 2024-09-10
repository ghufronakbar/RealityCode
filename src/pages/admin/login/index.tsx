import { useToast } from "@/components/ToastNotification";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import BottomGradient from "@/components/ui/bottom-gradient";
import Highlight from "@/components/ui/highlight";
import { Input } from "@/components/ui/input";
import { LabelInputContainer } from "@/components/ui/label";
import { Label } from "@radix-ui/react-label";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import Cookies from "js-cookie";
import login from "@/services/auth/login";
import { COOKIES_KEY } from "@/constants/key";

interface FormLogin {
  email: string;
  password: string;
}

const Login = () => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { showToast } = useToast();

  interface AxiosError<T = any> extends Error {
    config?: any;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formLogin.email == "" || formLogin.password == "") {
      showToast("All fields are required", "error");
      return;
    }
    showToast("Logging in...", "info");
    try {
      const response = await login(formLogin.email, formLogin.password);
      setFormLogin({ email: "", password: "" });
      showToast("Login successful", "success");
      Cookies.set(COOKIES_KEY, response.token.refreshToken, { expires: Number.MAX_VALUE });
      router.push("/admin/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError;
      showToast(axiosError.response?.data?.message, "error");
      console.log(error);
    }
  };

  return (
    <section
      id="login"
      className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center"
    >
      {" "}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <BackgroundGradient>
        <div className="max-w-md w-full h-fit mx-auto rounded-3xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Login as Admin
          </h2>
          <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            Reality Code is a project created by{" "}
            <Link href="https://instagram.com/ghufronakbar_">
              <span>
                <Highlight>@lanstheprodigy</Highlight>
              </span>
            </Link>
          </p>
          <form className="my-8 text-start" onSubmit={handleLogin}>
            <LabelInputContainer className="mb-4">
              <Label>Email Address</Label>
              <Input
                placeholder="Input your email address"
                type="email"
                value={formLogin.email}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, email: e.target.value })
                }
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label>Password</Label>
              <Input
                placeholder="Input your password"
                type="password"
                value={formLogin.password}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, password: e.target.value })
                }
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Login &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </BackgroundGradient>
    </section>
  );
};

export default Login;
