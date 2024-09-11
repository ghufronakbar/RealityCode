import React from "react";
import Button from "./Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};

const ModalConfirmation: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onConfirm,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm py-12"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-lg h-fit flex flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-3xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            {title}
          </h2>
          <button onClick={onClose} className="text-white">
            X
          </button>
        </div>

        <p>{description}</p>

        <div className="flex justify-end gap-4 ">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
