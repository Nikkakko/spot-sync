import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import { Icons } from "../icons";

interface AlbumLoaderProps {}

const AlbumLoader: React.FC<AlbumLoaderProps> = ({}) => {
  return (
    <div className="flex space-x-4 ">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="w-40 h-40" />
      ))}
    </div>
  );
};

export default AlbumLoader;
