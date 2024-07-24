
const NotificationLoading = () => {
    return (
      <div className="flex border-gray w-full px-3 py-4 rounded-3xl bg-black bg-opacity-45 backdrop-blur-lg gap-4">
        <div className="flex w-fit items-center">
          <div className="w-12 h-12 relative mx-auto my-auto">
            <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-1/3 h-2 bg-gray-200 animate-pulse rounded-3xl"></div>
          <div className="w-full h-2 bg-gray-200 animate-pulse rounded-3xl"></div>
          <div className="w-2/3 h-2 bg-gray-200 animate-pulse rounded-3xl"></div>
        </div>
      </div>
    );
  };

export default NotificationLoading