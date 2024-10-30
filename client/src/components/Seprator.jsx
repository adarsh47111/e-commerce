import { twMerge } from "tailwind-merge";

const Seprator = ({ variant, className }) => {
  const classes = (() => {
    switch (variant) {
      case "vertical":
        return "";
    }
  })();

  return (
    <div
      className={twMerge(
        `h-[1px] my-8 w-full bg-neutral-500`,
        classes,
        className
      )}
    ></div>
  );
};

export default Seprator;
