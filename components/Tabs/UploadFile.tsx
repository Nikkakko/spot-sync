import { UploadButton } from "@/utils/uploadthing";
import * as React from "react";

interface UploadFileProps {
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setImageKey: React.Dispatch<React.SetStateAction<string >>;
}

const UploadFile: React.FC<UploadFileProps> = ({ setImagePreview,setImageKey }) => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={res => {
        // Do something with the response
        console.log("Files: ", res);
        setImagePreview(res[0].url);
        setImageKey(res[0].key);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-10"
      appearance={{
        allowedContent: {
          display: "none",
        },

        button: {
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        },
      }}
    />
  );
};

export default UploadFile;
