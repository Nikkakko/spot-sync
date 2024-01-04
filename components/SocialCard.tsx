import { Social } from "@prisma/client";
import * as React from "react";

interface SocialCardProps {
  social: Social;
}

const SocialCard: React.FC<SocialCardProps> = ({ social }) => {
  return (
    <div className="border rounded-lg p-2 flex">
      <div>icon</div>
      <div className="flex flex-col"></div>
    </div>
  );
};

export default SocialCard;
