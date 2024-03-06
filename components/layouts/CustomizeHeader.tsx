"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { useRef } from "@/utils/store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";

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
    <header className="sticky top-0  py-2  backdrop-filter backdrop-blur-sm z-10 font-clash ">
      <div className="flex items-center justify-between container mx-auto px-2">
        <Button
          className="hover:no-underline flex items-center gap-1 px-0"
          variant="link"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          <Icons.moveLeft className="w-5 h-5" />
          Exit
        </Button>
        <h1 className="text-sm md:text-xl font-semibold text-muted-foreground flex gap-1">
          Customize
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
