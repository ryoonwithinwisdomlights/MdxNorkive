import { FileTextIcon } from "lucide-react";

interface FileWrapperProps {
  names: string;
  urls: string;
}

export default function FileWrapper(props: FileWrapperProps) {
  const { names, urls } = props;

  if (!urls) return null;
  return (
    <div className="my-4" data-tooltip={"PDF Open in new tab"}>
      <a
        href={urls}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm 
        w-full 
          rounded-md text-neutral-600 
          dark:text-neutral-200
          bg-neutral-100
      flex flex-row gap-2 items-center
            dark:bg-neutral-800  dark:border-neutral-700
            border-[1px]
            border-[#e5e5e5]
            hover:dark:text-white
            p-[10px] break-all
            "
        {...props}
      >
        <FileTextIcon className="w-4 h-4 mr-2" />
        file&nbsp;-&nbsp;
        {names}
      </a>
    </div>
  );
}
