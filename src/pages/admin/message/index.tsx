import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ToastNotification";
import Button from "@/components/Button";
import LayoutDashboard from "@/components/LayoutDashboard";
import DashboardLoading from "@/components/loading/DashboardLoading";
import Image from "next/image";
import formatDate from "@/utils/format/formatDate";
import Modal from "@/components/Modal";
import { LabelInputContainer } from "@/components/ui/label";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import BottomGradient from "@/components/ui/bottom-gradient";
import { ResponseFailure } from "@/models/Response";
import ModalConfirmation from "@/components/ModalConfirmation";
import formatString from "@/utils/format/formatString";
import getMessage from "@/services/message/getMessage";
import deleteMessage from "@/services/message/deleteMessage";
import withAuth from "@/utils/withAuth";
import { Message } from "@/models/Message";

const initState: Message = {
  id: 0,
  name: "",
  email: "",
  message: "",
  createdAt: "2022-01-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",
  file: undefined,
};

const MessagePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [message, setMessage] = useState<Message>(initState);
  const [reply, setReply] = useState<string>("");
  const { showToast } = useToast();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin/message"],
    queryFn: () => getMessage(),
    refetchOnWindowFocus: false,
  });

  const handleDeleteMessage = async () => {
    showToast("Deleting message...", "info");
    try {
      const res = await deleteMessage(selectedId);
      showToast(res.message || "Message deleted successfully", "success");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      const err = error as ResponseFailure;
      showToast(err.response.data.message || "Something went wrong", "error");
    } finally {
      setSelectedId(0);
      setIsConfirm(false);
    }
  };

  return (
    <Sidebar>
      <LayoutDashboard title="Message">
        {isLoading || (isFetching && <DashboardLoading />)}
        {!isLoading && !isFetching && data && (
          <div className="relative overflow-x-auto hide-scroll rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr className="dark:border-b-white border-b-2 border-black">
                  <th scope="col" className="px-6 py-5">
                    No
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Sender
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => (
                  <tr key={item.id} className=" border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 flex flex-col">
                      <p className="font-semibold">{item.email}</p>
                      <p>{item.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      {formatString(item.message, 100)}
                    </td>
                    <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-4 flex gap-2 jusify-center items-center">
                      <Button
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedId(item.id);
                          setMessage(item);
                        }}
                      >
                        Reply
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedId(item.id);
                          setIsConfirm(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </LayoutDashboard>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedId(0);
          setMessage(initState);
        }}
        title="Reply Message"
      >
        <form className="my-8 text-start" onSubmit={() => {}}>
          {message.file && (
            <div className="w-full p-8">
              <Image
                src={message.file}
                alt={"Attachment from " + message.email}
                width={600}
                height={600}
                className="w-full aspect-1 object-cover rounded-md mb-4"
              />
            </div>
          )}
          <LabelInputContainer className="mb-4">
            <Label>Email Sender</Label>
            <Input disabled value={message.email} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Sender Name</Label>
            <Input disabled value={message.name} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Message</Label>
            <TextArea
              value={message.message}
              disabled
              className="hide-scroll"
              rows={10}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Reply</Label>
            <TextArea
              value={reply}              
              onChange={(e) => setReply(e.target.value)}
              className="hide-scroll"
              rows={10}
            />
          </LabelInputContainer>

          <div className="mb-4"></div>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Send &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </Modal>
      <ModalConfirmation
        isOpen={isConfirm}
        onClose={() => {
          setIsConfirm(false);
          setSelectedId(0);
        }}
        title="Delete Message"
        description="Are you sure you want to delete this message?"
        onConfirm={handleDeleteMessage}
      />
    </Sidebar>
  );
};

export default withAuth(MessagePage);
