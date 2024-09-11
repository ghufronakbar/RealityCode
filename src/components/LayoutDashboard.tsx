interface LayoutDashboardProps {
  title: string;
  childrenHeader?: React.ReactNode;
  children: React.ReactNode;
}
const LayoutDashboard = ({
  title,
  childrenHeader,
  children,
}: LayoutDashboardProps) => {
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
      <div className="flex justify-between">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
          {title}
        </h2>
        {childrenHeader}
      </div>
      <div className="flex flex-col gap-2 flex-1 mt-4">{children}</div>
    </div>
  );
};

export default LayoutDashboard;