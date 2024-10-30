import { twMerge } from "tailwind-merge";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-md bg-[#dedede]", className)}
      {...props}
    />
  );
};

export default Skeleton;
