import { useState } from "react";

export interface FaqProps {
  title: string;
  description: string;
}

const Faq = (props: FaqProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="text-gray-light flex cursor-pointer flex-col border-b p-3"
    >
      <div className="flex flex-row items-center">
        <p
          className={`flex-auto hover:text-[color:var(--bg-purple-100)] ${
            expanded
              ? "font-black text-[color:var(--bg-purple-100)]"
              : "font-normal"
          }`}
        >
          {props.title}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div
        className={`transition-max-height overflow-hidden duration-700 ease-in-out ${
          expanded ? "max-h-20" : "max-h-0"
        }`}
      >
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Faq;
