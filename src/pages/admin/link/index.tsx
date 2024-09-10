import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import getLinks from "@/features/link/getLink";
import TableLoading from "@/components/loading/TableLoading";
import axios from "axios";
import Image from "next/image";
import { useToast } from "@/components/ToastNotification";
import addLink from "@/services/link/addLink";
import deleteLink from "@/services/link/deleteLink";

type TypeLink = {
  id: number;
  title: string;
  url: string;
  desc: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
};

const LinkPage: React.FC = () => {
  const [linkId, setLinkId] = useState<number>(0);
  const [linkTitle, setLinkTitle] = useState<string>("");
  const { showToast } = useToast();
  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["linkTree"],
    queryFn: () => getLinks(100),
    refetchOnWindowFocus: false,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    desc: "",
    icon: "",
  });

  const handleAddLink = async () => {
    const response = await addLink(formData.title, formData.url, formData.desc, formData.icon);
    showToast(response.message, "success");
    refetch();    
  };

  const editLink = async () => {
    await axios.put(`/api/admin/link`, { ...formData, id: linkId });
    refetch();
    return "Success Edit Item";
  };

  const handleDeleteLink = async (id: number) => {
    const response = await deleteLink(id);
    showToast(response.message, "info");
    refetch();    
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.desc === "" ||
      formData.url === "" ||
      formData.icon === ""
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    showToast("Please wait...", "info");
    try {
      if (linkId === 0) {
        await handleAddLink();
        showToast("Item added successfully!", "success");
      } else {
        await editLink();
        showToast("Item updated successfully!", "success");
      }
      setIsModalOpen(false);
      setLinkId(0);
      setFormData({
        title: "",
        url: "",
        desc: "",
        icon: "",
      });
    } catch (error) {
      console.error(error);
      showToast("An error occurred. Please try again.", "error");
      setIsModalOpen(false);
      setLinkId(0);
      setFormData({
        title: "",
        url: "",
        desc: "",
        icon: "",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await handleDeleteLink(id);
      showToast("Item deleted successfully!", "info");
    } catch (error) {
      console.error(error);
      showToast("An error occurred. Please try again.", "error");
    }
  };

  return (
    <Sidebar>
      <div className="flex-1 p-10 text-white">
        <h1 className="text-4xl font-bebas mb-6 mt-6">Link Tree</h1>
        <button
          onClick={() => {
            setLinkTitle("Add Item");
            setIsModalOpen(true);
            setLinkId(0);
          }}
          className="mb-4 px-4 py-2 bg-accent text-white font-bold rounded hover:bg-primary bg-opacity-50 backdrop-blur-lg"
        >
          Add New Item
        </button>
        <table className="min-w-full bg-secondary rounded bg-opacity-50 backdrop-blur-lg ">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-montserrat">No</th>
              <th className="py-2 px-4 text-left font-montserrat">Item</th>
              <th className="py-2 px-4 text-left font-montserrat">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <>
                <TableLoading colSpan={3} />
                <TableLoading colSpan={3} />
                <TableLoading colSpan={3} />
              </>
            ) : isError ? (
              <tr className="border-t">
                <td colSpan={3} className="w-full items-center">
                  <div className="text-center text-white font-bebas font-semibold text-lg py-2">
                    Error Fetching Data :(
                  </div>
                </td>
              </tr>
            ) : data && data.data.length > 0 ? (
              data.data.map((item: TypeLink, index: number) => (
                <tr className="border-t" key={index}>
                  <td className="py-2 px-4 md:text-base text-sm">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 ">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-lg "
                      />
                      <div className="md:text-base text-sm font-semibold">
                        {item.title}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 flex gap-2 items-center ">
                    <div
                      className="w-8 h-8 bg-accent bg-opacity-50 backdrop-blur-lg rounded-lg p-2 hover:bg-white transition-all duration-300"
                      onClick={() => {
                        setLinkTitle("Edit Item");
                        setLinkId(item.id);
                        setIsModalOpen(true);
                        setFormData({
                          title: item.title,
                          url: item.url,
                          desc: item.desc,
                          icon: item.icon,
                        });
                      }}
                    >
                      <MdOutlineModeEdit className="text-white hover:text-accent cursor-pointer w-full h-full transition-all duration-300" />
                    </div>
                    <div
                      className="w-8 h-8 bg-red-500 bg-opacity-50 backdrop-blur-lg rounded-lg p-2 hover:bg-white transition-all duration-300"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDeleteOutline className="text-white hover:text-red-500 cursor-pointer w-full h-full transition-all duration-300" />
                    </div>
                  </td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({ title: "", url: "", desc: "", icon: "" });
          setLinkId(0);
        }}
        title={linkTitle}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="w-full px-4 py-2 text-black rounded"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="url">
              URL
            </label>
            <input
              className="w-full px-4 py-2 text-black rounded"
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="desc">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 text-black rounded"
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="icon">
              Icon
            </label>
            <select
              className="w-full px-4 py-2 text-black rounded"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
            >
              <option value="">Select Icon</option>
              <option value="/icons/instagram.webp">
                <img
                  src="/icons/instagram.webp"
                  alt="Icon 2"
                  className="inline-block w-6 h-6 mr-2"
                />
                Instagram
              </option>
              <option value="/icons/twitter.webp">
                <img
                  src="/icons/twitter.webp"
                  alt="Icon 3"
                  className="inline-block w-6 h-6 mr-2"
                />
                Twitter
              </option>
              <option value="/icons/web.webp">
                <img
                  src="/icons/web.webp"
                  alt="Icon 4"
                  className="inline-block w-6 h-6 mr-2"
                />
                Web
              </option>
              <option value="/icons/form.webp">
                <img
                  src="/icons/form.webp"
                  alt="Icon 5"
                  className="inline-block w-6 h-6 mr-2"
                />
                Form
              </option>
              <option value="/icons/whatsapp.webp">
                <img
                  src="/icons/whatsapp.webp"
                  alt="Icon 6"
                  className="inline-block w-6 h-6 mr-2"
                />
                Whatsapp
              </option>
              <option value="/icons/email.webp">
                <img
                  src="/icons/email.webp"
                  alt="Icon 7"
                  className="inline-block w-6 h-6 mr-2"
                />
                Email
              </option>
              <option value="/icons/tiktok.webp">
                <img
                  src="/icons/tiktok.webp"
                  alt="Icon 7"
                  className="inline-block w-6 h-6 mr-2"
                />
                Tiktok
              </option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white font-bold rounded hover:bg-primary"
            >
              {linkTitle}
            </button>
          </div>
        </form>
      </Modal>
    </Sidebar>
  );
};

export default LinkPage;
