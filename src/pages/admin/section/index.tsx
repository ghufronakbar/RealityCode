import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ToastNotification";
import Button from "@/components/Button";
import LayoutDashboard from "@/components/LayoutDashboard";
import DashboardLoading from "@/components/loading/DashboardLoading";
import getAllPost from "@/services/post/getAllPost";
import Image from "next/image";
import formatDate from "@/utils/format/formatDate";
import Modal from "@/components/Modal";
import createPost, { FormPost } from "@/services/post/createPost";
import { LabelInputContainer } from "@/components/ui/label";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import BottomGradient from "@/components/ui/bottom-gradient";
import { ResponseFailure } from "@/models/Response";
import { FileUploadMulti } from "@/components/ui/file-upload-multi";
import editPost from "@/services/post/editPost";
import ModalConfirmation from "@/components/ModalConfirmation";
import deletePost from "@/services/post/deletePost";
import formatString from "@/utils/format/formatString";
import addPostImage from "@/services/post/addPostImage";
import { Limitation } from "@/models/Limitation";
import withAuth from "@/utils/withAuth";
import { getAllSection } from "@/services/section";
import { Select } from "@/components/ui/select";
import { useRouter } from "next/router";
import { Section, SubSection } from "@/models/Section";

const SectionPage: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [selectedSectionId, setSelectedSectionId] = useState<number>(0);
  const [selectedSubSectionId, setSelectedSubSectionId] = useState<number>(0);
  const [selected, setSelected] = useState<{ id: number; image: string }>({
    id: 0,
    image: "/",
  });

  const [formPost, setFormPost] = useState<FormPost>({
    title: "",
    content: "",
    images: [],
  });
  const section = (router.query.section as string) || "0";
  const { showToast } = useToast();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin/section/page"],
    queryFn: () => getAllSection(),
    refetchOnWindowFocus: false,
  });

  const { data: dataSection } = useQuery({
    queryKey: ["admin/section"],
    queryFn: () => getAllSection(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const handleFileUpload = (files: File[]) => {
    setFormPost({
      ...formPost,
      images: formPost.images.concat(files),
    });
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formPost.title == "" || formPost.content == "") {
      showToast("Please add title and content", "error");
      return;
    }
    if (formPost.images.length == 0) {
      showToast("Please add image", "error");
      return;
    }
    showToast("Creating post...", "info");
    try {
      const res = await createPost(formPost, selectedSubSectionId);
      showToast(res.message, "success");
      setIsOpen(false);
      setFormPost({
        title: "",
        content: "",
        images: [],
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

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formPost.title == "" || formPost.content == "") {
      showToast("Please add title and content", "error");
      return;
    }
    showToast("Editing post...", "info");
    try {
      const res = await editPost(selected.id, formPost);
      if (selected.id !== 0 && formPost.images.length > 0) {
        try {
          const response = await addPostImage(selected.id, formPost.images);
          showToast(response.message || "Success add images", "success");
        } catch (error) {
          console.log(error);
          const err = error as ResponseFailure;
          showToast(
            err?.response?.data?.message || "Something went wrong",
            "error"
          );
        }
      }
      showToast(res.message, "success");
      refetch();
      setSelected({ id: 0, image: "/" });
      setFormPost({
        title: "",
        content: "",
        images: [],
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      const err = error as ResponseFailure;
      showToast(err.response.data.message || "Something went wrong", "error");
    }
  };

  const handleDeletePost = async () => {
    showToast("Deleting post...", "info");
    try {
      const res = await deletePost(selected.id);
      showToast(res.message, "success");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      const err = error as ResponseFailure;
      showToast(err.response.data.message || "Something went wrong", "error");
    } finally {
      setSelected({ id: 0, image: "/" });
      setIsConfirm(false);
    }
  };

  return (
    <Sidebar>
      <LayoutDashboard
        title="Section"
        childrenHeader={
          <div className="flex gap-4">
            <Select
              value={section}
              onChange={(e) =>
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, section: e.target.value },
                })
              }
            >
              <option value="0">Select Sub Section</option>
              {dataSection?.data.flatMap((section: Section) =>
                section.subsections.map((subSection) => (
                  <option key={subSection.id} value={subSection.id}>
                    {subSection.title}
                  </option>
                ))
              )}
            </Select>
            <Button onClick={() => setIsOpen(true)}>Add Post</Button>
          </div>
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
                    Content
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
                {data?.data.flatMap((section: Section) =>
                  section.subsections.map((item, index) => (
                    <tr
                      key={item.id}
                      className=" border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        <Image
                          src={item.thumbnail || "/"}
                          alt={item.title}
                          width={200}
                          height={200}
                          className="w-20 aspect-1 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">
                        {formatString(item.description, 100)}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </LayoutDashboard>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelected({ id: 0, image: "/" });
          setFormPost({ title: "", content: "", images: [] });
        }}
        title={selected.id == 0 ? "Add Post" : "Edit Post"}
      >
        <form
          className="my-8 text-start"
          onSubmit={selected.id == 0 ? handleCreatePost : handleEditPost}
        >
          {selected.id != 0 && (
            <div className="w-full p-8">
              <Image
                src={selected.image}
                alt={formPost.title}
                width={600}
                height={600}
                className="w-full aspect-1 object-cover rounded-md mb-4"
              />
            </div>
          )}
          <LabelInputContainer className="mb-4">
            <Label>Title</Label>
            <Input
              placeholder="Input title"
              type="text"
              value={formPost.title}
              onChange={(e) =>
                setFormPost({ ...formPost, title: e.target.value })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Content</Label>
            <TextArea
              placeholder="Input content"
              className="hide-scroll"
              value={formPost.content}
              onChange={(e) =>
                setFormPost({ ...formPost, content: e.target.value })
              }
            />
          </LabelInputContainer>

          {selected.id === 0 && (
            <>
              <LabelInputContainer className="mb-4">
                <Label>Section</Label>
                <Select
                  value={selectedSectionId}
                  onChange={(e) => setSelectedSectionId(Number(e.target.value))}
                >
                  <option value="0">Select Section</option>
                  {dataSection &&
                    dataSection.data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </Select>
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label>Sub Section</Label>
                <Select
                  value={selectedSubSectionId}
                  onChange={(e) =>
                    setSelectedSubSectionId(Number(e.target.value))
                  }
                  disabled={selectedSectionId === 0}
                >
                  <option value="0">Select Sub Section</option>
                  {dataSection?.data
                    ?.find((item) => item.id === selectedSectionId)
                    ?.subsections?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </Select>
              </LabelInputContainer>
            </>
          )}

          <LabelInputContainer className="mb-4">
            <Label>Image</Label>
            <FileUploadMulti onChange={handleFileUpload} />
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
          setSelected({ id: 0, image: "/" });
        }}
        title="Delete Post"
        description="Are you sure you want to delete this post?"
        onConfirm={handleDeletePost}
      />
    </Sidebar>
  );
};

export default withAuth(SectionPage);
