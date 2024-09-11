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

const PostPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [selected, setSelected] = useState<{ id: number; image: string }>({
    id: 0,
    image: "/",
  });
  const [limitation, setLimitation] = useState<Limitation>({
    currentData: 0,
    totalData: 0,
  });
  const [formPost, setFormPost] = useState<FormPost>({
    title: "",
    content: "",
    images: [],
  });
  const { showToast } = useToast();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin/post", limit],
    queryFn: () => getAllPost(limit, ""),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data) {
      setLimitation(data.limitation);
    }
  }, [data]);
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
      const res = await createPost(formPost);
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

  const handleLoadMore = () => {
    if(limitation.currentData < limitation.totalData) {
      setLimit(limit + 3);
    }
  }

  return (
    <Sidebar>
      <LayoutDashboard
        title="Post"
        childrenHeader={
          <Button onClick={() => setIsOpen(true)}>Add Post</Button>
        }
      >
        {isLoading || isFetching && <DashboardLoading />}
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
                        src={item.images[0].url}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-20 aspect-1 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">
                      {formatString(item.content, 100)}
                    </td>
                    <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Button
                        onClick={() => {
                          setIsOpen(true);
                          setSelected({
                            id: item.id,
                            image: item.images[0].url,
                          });
                          setFormPost({
                            title: item.title,
                            content: item.content,
                            images: [],
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setSelected({
                            id: item.id,
                            image: item.images[0].url,
                          });
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
        {data && limitation.currentData < limitation.totalData && (
          <div className="self-end mt-4">
            <Button onClick={handleLoadMore}>Load More</Button>
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

          <LabelInputContainer className="mb-4">
            <Label>Content</Label>
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

export default PostPage;
