import * as React from "react";
import { Skeleton } from "../ui/skeleton";

interface UserProfileLoaderProps {}

const UserProfileLoader: React.FC<UserProfileLoaderProps> = ({}) => {
  return (
    <div className="mt-14 flex w-full">
      <Skeleton className="w-full h-64 rounded-lg" />
    </div>
  );
};

export default UserProfileLoader;
