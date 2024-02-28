"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { useRef } from "@/utils/store";
import { useUploadThing } from "@/utils/uploadthing";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface CustomizeHeaderProps {}

const CustomizeHeader: React.FC<CustomizeHeaderProps> = ({}) => {
  const { ref, isSubmitting } = useRef();

  const router = useRouter();

  const handleSubmit = () => {
    if (ref.current) {
      ref.current.requestSubmit();
    }
  };

  return (
    <header className="sticky top-0 px-4 py-2 flex items-center justify-between border-b border-black/50 backdrop-filter backdrop-blur-sm z-10 ">
      <Button
        className="hover:no-underline"
        variant="link"
        onClick={() => router.back()}
        disabled={isSubmitting}
      >
        Exit
      </Button>
      <h1
        className="
        text-xl font-semibold text-muted-foreground
      "
      >
        Customize your site
      </h1>
      <Button
        className={cn("", isSubmitting && "opacity-50 pointer-events-none")}
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </header>
  );
};

export default CustomizeHeader;
