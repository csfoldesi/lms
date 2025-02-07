"use client";

import { OutFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProp {
  onChange: (url?: string, name?: string) => void;
  endpoint: keyof OutFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProp) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res) {
          onChange(res?.[0].url, res?.[0].name);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
