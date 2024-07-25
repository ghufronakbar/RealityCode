import React, { useEffect } from "react";

type ToastProps = {
  info: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ info, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (info) {
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${getToastStyles()}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-xl font-bold focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
