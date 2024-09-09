import React, { useState } from "react";
import axios from "axios";
import { Label, LabelInputContainer } from "../ui/label";
import { Input } from "../ui/input";
import { TextArea } from "../ui/text-area";
import Link from "next/link";
import { FileUpload } from "../ui/file-upload";
import BottomGradient from "../ui/bottom-gradient";
import ToastNotification from "../ToastNotification";
import sendMessage from "@/services/user/sendMessage";

interface FormContact {
  name: string;
  email: string;
  message: string;
  file?: File;
}

const ContactSection = () => {
  const [formContact, setFormContact] = useState<FormContact>({
    name: "",
    email: "",
    message: "",
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleFileUpload = (files: File) => {
    setFormContact({ ...formContact, file: files });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formContact.name == "" ||
      formContact.email == "" ||
      formContact.message == ""
    ) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }
    try {
     const response = await sendMessage(formContact.name, formContact.email, formContact.message, formContact.file);
      setIsOpen(true);
      setFormContact({
        name: "",
        email: "",
        message: "",
        file: undefined,
      });
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="contact" className="py-40 px-6 text-center">
      <ToastNotification
        status="success"
        message="Your message has been sent."
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <ToastNotification
        status="error"
        message="Please fill the form."
        isVisible={isError}
        onClose={() => setIsError(false)}
      />
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Contact Us
        </h2>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Have questions? Reach out to us at{" "}
          <Link href="mailto:realitycode@outlook.com" className="text-accent">
            realitycode@outlook.com
          </Link>
        </p>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <form className="my-8" onSubmit={handleSendMessage}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="firstname">Your name</Label>
              <Input
                id="firstname"
                placeholder="Lans The Prodigy"
                type="text"
                value={formContact.name}
                onChange={(e) =>
                  setFormContact({ ...formContact, name: e.target.value })
                }
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="lanstheprodigy@gmail.com"
                type="email"
                value={formContact.email}
                onChange={(e) =>
                  setFormContact({ ...formContact, email: e.target.value })
                }
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                placeholder="I want to reach out to you"
                rows={6}
                value={formContact.message}
                onChange={(e) =>
                  setFormContact({ ...formContact, message: e.target.value })
                }
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="message">Attachment</Label>
              <FileUpload onChange={handleFileUpload} />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Send &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
