import { FileRouter } from "@/app/api/uploadthing/core";
import { generateUploadButton, generateUploadDropzone, generateUploader } from "@uploadthing/react";

export const UploadButton = generateUploadButton<FileRouter>();
export const UploadDropzone = generateUploadDropzone<FileRouter>();
export const Uploader = generateUploader<FileRouter>();
