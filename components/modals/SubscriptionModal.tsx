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
import { PriceProps, buttonPrices, subItems } from "@/app/helpers/siteData";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { Icons } from "../icons";

interface SubscriptionModalProps extends React.HTMLAttributes<HTMLDivElement> {}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ ...props }) => {
  const { isOpen, type, onClose } = useModalStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = React.useState<PriceProps>(
    buttonPrices[0]
  );

  const isSubOpen = isOpen && type === "subscription";

  async function onPayment() {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stripe/subscription", {
        price: selectedPlan.price,
        interval: selectedPlan.interval,
      });

      // Redirect the user to the Stripe checkout session URL
      if (response.status === 200) {
        router.push(response.data.url);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }
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
            {`Get your Noise to the next level for just
            $${selectedPlan.price}
            per ${selectedPlan.interval === "Monthly" ? "month" : "year"}       
            and access
            exclusive themes, see who your fans are with analytics and more..`}
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
                "flex items-center justify-between gap-2 py-2 px-4 rounded-md border border-[#06b6d4] cursor-pointer hover:scale-105 transition duration-300 ease-in-out",
                selectedPlan === item
                  ? "bg-[#06b6d4] text-white"
                  : "bg-white text-[#06b6d4]"
              )}
              onClick={() => setSelectedPlan(item)}
            >
              <p className="text-base font-clash ">{item.interval}</p>
              <p className="text-base font-clash ">${item.price}</p>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            className=""
            size="lg"
            onClick={onPayment}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.loader size={24} className="mr-2 animate-spin" />
            )}
            Take My Money!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
