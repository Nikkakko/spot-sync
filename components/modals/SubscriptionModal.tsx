"use client";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useModalStore } from "./ModalStore";
import { Separator } from "../ui/separator";
import { subItems } from "@/app/helpers/siteData";

interface SubscriptionModalProps extends React.HTMLAttributes<HTMLDivElement> {}

const buttonPrices = [
  { price: 28, title: "Yearly" },
  { price: 4, title: "Monthly" },
];

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ ...props }) => {
  const { isOpen, type, onClose } = useModalStore();
  const [selectedPlan, setSelectedPlan] = React.useState("yearly");

  const isSubOpen = isOpen && type === "subscription";
  return (
    <Dialog open={isSubOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-[408px]  bg-white rounded-lg shadow-lg p-6",
          props.className
        )}
      >
        <DialogHeader className="font-clash">
          <DialogTitle className="mb-2">Go Pro</DialogTitle>
          <DialogDescription>
            Get your Noise to the next level for just $28 per year and access
            exclusive themes, see who your fans are with analytics and more..
          </DialogDescription>
        </DialogHeader>
        <Separator />

        {subItems.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div
              className="min-w-10 h-10 border border-[#06b6d4] rounded-lg flex items-center justify-center 
              bg-subIconBg text-white shadow-md mt-1"
            >
              <item.icon size={24} className="text-[#00788D]" />
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-normal font-clash text-primary ">
                {item.title}
              </h3>
              <p className="text-black/50 text-sm font-mono">
                {item.description}
              </p>
            </div>
          </div>
        ))}

        <Separator />

        <div className="flex items-center justify-center gap-4">
          {buttonPrices.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between gap-2 py-2 px-4 rounded-md border border-[#06b6d4] cursor-pointer",
                selectedPlan === item.title.toLowerCase()
                  ? "bg-[#06b6d4] text-white"
                  : "bg-white text-[#06b6d4]"
              )}
              onClick={() => setSelectedPlan(item.title.toLowerCase())}
            >
              <p className="text-base font-clash ">{item.title}</p>
              <p className="text-base font-clash ">${item.price}</p>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button>Take My Money!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
