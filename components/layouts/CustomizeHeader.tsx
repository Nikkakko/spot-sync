"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { useRef } from "@/utils/store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CustomizeHeaderProps {}

const CustomizeHeader: React.FC<CustomizeHeaderProps> = ({}) => {
  const { ref, isSubmitting, isChanged } = useRef();

  const router = useRouter();

  const handleSubmit = () => {
    if (ref.current) {
      ref.current.requestSubmit();
    } else {
      console.log("No ref found");
    }
  };

  return (
    <header className="sticky top-0  py-2 border-b border-black/50 backdrop-filter backdrop-blur-sm z-10 ">
      <div className="flex items-center justify-between container mx-auto">
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
          className={cn("disabled:opacity-50")}
          type="submit"
          disabled={isSubmitting || !isChanged}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </header>
  );
};

export default CustomizeHeader;
