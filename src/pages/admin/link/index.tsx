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
import getLink from "@/services/link/getLink";
import addLink, { FormLink } from "@/services/link/addLink";
import editLink from "@/services/link/editLink";
import deleteLink from "@/services/link/deleteLink";
import ICON_ITEMS from "@/data/iconItems";
import withAuth from "@/utils/withAuth";

const LinkPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [formLink, setFormLink] = useState<FormLink>({
    title: "",
    desc: "",
    icon: "",
    url: "",
  });
  const [selectedId, setSelectedId] = useState<number>(0);
  const { showToast } = useToast();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin/link"],
    queryFn: () => getLink(),
    refetchOnWindowFocus: false,
  });

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formLink.title == "" ||
      formLink.desc == "" ||
      formLink.url == "" ||
      formLink.icon == ""
    ) {
      showToast("Please fill in all fields", "error");
      return;
    }
    showToast("Creating link...", "info");
    try {
      const res = await addLink(formLink);
      showToast(res.message, "success");
      setIsOpen(false);
      setFormLink({
        title: "",
        desc: "",
        icon: "",
        url: "",
      });
      refetch();
    } catch (error) {
      console.log(error);
      const err = error as ResponseFailure;
      showToast(
        err?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  const handleEditLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formLink.title == "" ||
      formLink.desc == "" ||
      formLink.url == "" ||
      formLink.icon == ""
    ) {
      showToast("Please fill in all fields", "error");
      return;
    }
    showToast("Editing link...", "info");
    try {
      const res = await editLink(selectedId, formLink);
      showToast(res.message, "success");
      refetch();
      setSelectedId(0);
      setFormLink({
        title: "",
        desc: "",
        icon: "",
        url: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      const err = error as ResponseFailure;
      showToast(err.response.data.message || "Something went wrong", "error");
    }
  };

  const handleDeleteLink = async () => {
    showToast("Deleting link...", "info");
    try {
      const res = await deleteLink(selectedId);
      showToast(res.message, "success");
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
      <LayoutDashboard
        title="Link"
        childrenHeader={
          <Button onClick={() => setIsOpen(true)}>Add Link</Button>
        }
      >
        {isLoading || (isFetching && <DashboardLoading />)}
        {!isLoading && !isFetching && data && (
          <div className="relative overflow-x-auto hide-scroll rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr className="dark:border-b-white border-b-2 border-black">
                  <th scope="col" className="px-6 py-5">
                    No
                  </th>
                  <th scope="col" className="px-6 py-5"></th>
                  <th scope="col" className="px-6 py-5">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Desc
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
                    <td className="px-6 py-4">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-20 aspect-1 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">
                      {formatString(item.desc, 100)}
                    </td>
                    <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Button
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedId(item.id);
                          setFormLink({
                            title: item.title,
                            desc: item.desc,
                            icon: item.icon,
                            url: item.url,
                          });
                        }}
                      >
                        Edit
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
          setFormLink({
            title: "",
            desc: "",
            icon: "",
            url: "",
          });
        }}
        title={selectedId == 0 ? "Add Link" : "Edit Link"}
      >
        <form
          className="my-8 text-start"
          onSubmit={selectedId == 0 ? handleCreateLink : handleEditLink}
        >
          <LabelInputContainer className="mb-4">
            <Label>Title</Label>
            <Input
              placeholder="Input title"
              type="text"
              value={formLink.title}
              onChange={(e) =>
                setFormLink({ ...formLink, title: e.target.value })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>URL</Label>
            <Input
              placeholder="Input url"
              type="url"
              value={formLink.url}
              onChange={(e) =>
                setFormLink({ ...formLink, url: e.target.value })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Choose Icon</Label>
            <select
              className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400"
              value={formLink.icon}
              onChange={(e) =>
                setFormLink({ ...formLink, icon: e.target.value })
              }
            >
              <option value="">Choose Icon</option>
              {ICON_ITEMS.map((item, i) => (
                <option key={i} value={item.icon}>
                  {item.title}
                </option>
              ))}
            </select>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Description</Label>
            <TextArea
              placeholder="Input description"
              className="hide-scroll"
              value={formLink.desc}
              onChange={(e) =>
                setFormLink({ ...formLink, desc: e.target.value })
              }
            />
          </LabelInputContainer>

          <div className="mb-4"></div>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
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
        title="Delete Link"
        description="Are you sure you want to delete this link?"
        onConfirm={handleDeleteLink}
      />
    </Sidebar>
  );
};

export default withAuth(LinkPage);
