"use client";

import { useState } from "react";
import { Message, Uploader, useToaster } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";

interface AddSingleVariantImageUploadProps {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
  label: string;
}

const AddFeaturedImage = ({ field }: AddSingleVariantImageUploadProps) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const toaster = useToaster();
  // !
  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 512 * 1 * 1024; // 512 kb

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit
      ) {
        setFileValue([latestFile]);
        field.onChange(latestFile);

        const file = latestFile;
        const reader = new FileReader();

        reader.onload = (e) => {
          const imagePreviewUrl = e.target?.result as string;
          setImagePreview(imagePreviewUrl);
        };

        reader.readAsDataURL(file.blobFile as File);
      } else {
        clearImagePreview();
        toaster.push(
          <Message bordered centered showIcon type="warning" closable>
            <h4 className="font-semibold text-sm lg:text-2xl">
              {" "}
              File size exceeds 5 MB.
            </h4>
          </Message>,
          { placement: "topEnd", duration: 3000 }
        );
      }
    } else {
      clearImagePreview();
    }
  };

  const clearImagePreview = () => {
    setImagePreview(undefined);

    setFileValue([]);
    field.onChange(undefined);
  };

  return (
    <div className="relative w-full mt-1 group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeImages}
        draggable
        autoUpload={false}
        action={""}
        onRemove={clearImagePreview}
        className="w-full "
        accept="image/*"
      >
        <div
          style={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          className="md:!w-[200px]"
        >
          {imagePreview ? (
            <Image
              width={200}
              height={200}
              src={imagePreview}
              alt="Image Preview"
              className="w-full md:w-full rounded-[10px] h-full object-cover object-center cursor-pointer"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
              }}
            />
          ) : (
            <span className="text-xs flex justify-center flex-col items-center gap-2 text-center font-semibold text-black/60">
              <AiOutlineCloudUpload size={40} />
              Upload
            </span>
          )}
        </div>
      </Uploader>
    </div>
  );
};

export default AddFeaturedImage;
