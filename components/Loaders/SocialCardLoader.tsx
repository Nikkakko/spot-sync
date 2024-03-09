import * as React from "react";
import { Skeleton } from "../ui/skeleton";

interface SocialCardLoaderProps {}

const SocialCardLoader: React.FC<SocialCardLoaderProps> = ({}) => {
  return (
    <div className="mt-4 w-full flex flex-col gap-4">
      <Skeleton className="w-full h-14 rounded-lg" />
      <Skeleton className="w-full h-14 rounded-lg" />
      <Skeleton className="w-full h-14 rounded-lg" />
      <Skeleton className="w-full h-14 rounded-lg" />
    </div>
  );
};

export default SocialCardLoader;
