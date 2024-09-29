"use client";
import { useEffect, useState } from "react";
import { Notification, Uploader, useToaster } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import Image from "next/image";
import { fileUrlKey } from "@/helpers/config/envConfig";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface StyleImageUploadProps {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
  defaultImage: string;
}

const UpdateKidPhoto = ({ field, defaultImage }: StyleImageUploadProps) => {
  const toaster = useToaster();

  const [currentFile, setCurrentFile] = useState<any>(
    defaultImage
      ? {
          fileKey: defaultImage?.substring(14),
          name: defaultImage?.substring(14) || "File Name",
          url: `${fileUrlKey()}/${defaultImage}`,
          size: null,
        }
      : null
  );

  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 1024 * 5 * 1024; // 5 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit
      ) {
        const fileType = latestFile.blobFile.type;
        if (fileType?.startsWith("image/")) {
          const url = URL.createObjectURL(latestFile.blobFile); // Create a URL for the image
          setCurrentFile({ ...latestFile, url }); // Add the URL to the file object
          field.onChange(latestFile);
          return;
        }
      }

      toaster.push(
        <Notification header="Error" type="error">
          <p className="text-sm">Please upload an image within 5 MB.</p>
        </Notification>,
        { placement: "bottomStart", duration: 3000 }
      );
      field.onChange(undefined);
      setCurrentFile(null);
    }
  };

  const handleRemoveFile = () => {
    field.onChange(undefined);
    setCurrentFile(null);
  };

  const formatFileSize = (bytes: any) => {
    if (bytes === undefined || bytes === null || isNaN(bytes)) return "N/A";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  useEffect(() => {
    if (defaultImage && !currentFile?.size && currentFile) {
      fetch(`${fileUrlKey()}/${defaultImage}`)
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then((blob) => {
          setCurrentFile((prevFile: any) => ({
            ...prevFile,
            size: blob.size,
          }));
        })
        .catch((error) => {
          console.error("Error fetching file size:", error);
          setCurrentFile((prevFile: any) => ({
            ...prevFile,
            size: null,
          }));
        });
    }
  }, [currentFile?.size, currentFile, defaultImage]);

  return (
    <div className="relative group">
      {currentFile ? (
        <div className="my-5 space-y-5">
          <div className="flex justify-center ">
            <Image
              width={1000}
              height={1000}
              src={currentFile?.url} // Use the URL here
              alt="Image Preview"
              className="rounded-full h-[200px] w-[200px] object-cover object-center"
            />
          </div>
          <div className="flex justify-between gap-5 items-start bg-slate-100 p-3">
            <div className="text-start">
              <p className="text-wrap">{currentFile?.name}</p>
              <span className="text-xs">
                Size :
                {formatFileSize(
                  currentFile?.size || currentFile?.blobFile?.size
                )}
              </span>
            </div>
            <div className="z-10">
              <button
                onClick={handleRemoveFile}
                className="text-[#f14e4e]   border px-2 border-red-600 hover:bg-red-600 hover:text-white duration-300"
                type="button"
              >
                Remove File
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Uploader
          fileListVisible={false}
          draggable
          autoUpload={false}
          onChange={handleChangeImages}
          accept="image/*"
          action={""}
        >
          <div
            style={{
              width: 200,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            className="w-full"
          >
            <span className="text-xs flex justify-center flex-col items-center gap-2 text-center font-semibold text-black/60">
              <AiOutlineCloudUpload size={40} />
              Upload
            </span>
          </div>
        </Uploader>
      )}
    </div>
  );
};

export default UpdateKidPhoto;
