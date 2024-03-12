import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useModalStore } from "./ModalStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface CancelDialogProps {}

const CancelDialog: React.FC<CancelDialogProps> = ({}) => {
  const { type, onClose, isOpen } = useModalStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();

  const isDialogOpen = type === "cancel-sub" && isOpen;

  const handleCancel = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/stripe/cancel");

      if (res.status === 200) {
        toast({
          title: "Success",
          description:
            "Your subscription has been cancelled, you will be redirected to the settings page.",
          duration: 5000,
        });
        router.push(res.data.url);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!isDialogOpen) return null;
  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to cancel your subscription?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your subscription will be canceled immediately and you will lose
            access to all premium features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleCancel();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelDialog;
