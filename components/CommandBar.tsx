"use client";
import * as React from "react";
import { Icons } from "./icons";
import Link from "next/link";
import TooltipAction from "@/components/TooltipAction";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface CommandBarProps {}
const settingsBar = [
  {
    tooltip: "Share Site",
    icon: <Icons.share />,
  },
  {
    href: "/customize",
    tooltip: "Customize Site",
    icon: <Icons.edit />,
  },
  {
    href: "/account",
    tooltip: "Manage Account",
    icon: <Icons.user />,
  },
];

const CommandBar: React.FC<CommandBarProps> = ({}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "You can now share your site with your friends!",
      duration: 3000,
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 bg-black shadow-lg rounded-xl px-4 py-2">
      <div className="flex items-center gap-4">
        {settingsBar.map(({ href, tooltip, icon }) => (
          <TooltipAction key={tooltip} label={tooltip} side="top">
            {href ? (
              <Link
                href={href}
                className="p-2 rounded-lg hover:bg-white/10 hover:text-white
            text-[#3d3d3d]
            "
              >
                {icon}
              </Link>
            ) : (
              <Button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-black hover:bg-white/10 hover:text-white
            text-[#3d3d3d]
        
                
            "
              >
                {icon}
              </Button>
            )}
          </TooltipAction>
        ))}
      </div>
    </div>
  );
};

export default CommandBar;
