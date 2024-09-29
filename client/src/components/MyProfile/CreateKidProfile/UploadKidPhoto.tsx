"use client";

import { useState } from "react";
import { Message, Uploader, useToaster, Text } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";

interface IAddKidPhoto {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
}

const UploadKidPhoto = ({ field }: IAddKidPhoto) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const toaster = useToaster();
  // !
  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 512 * 10 * 1024;

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
              File size exceeds 10 MB.
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
    <div className="relative w-full !flex !justify-center mt-1 group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeImages}
        draggable
        autoUpload={false}
        action={""}
        removable={true}
        // fileListVisible={false}
        onRemove={clearImagePreview}
        className="w-full"
        accept="image/*"
        renderFileInfo={(file) => {
          return (
            <Text maxLines={1}>
              {file.name?.length ?? 0 > 7
                ? file.name?.slice(0, 7) + " ..."
                : file.name}
            </Text>
          );
        }}
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
          {imagePreview ? (
            <Image
              width={350}
              height={350}
              src={imagePreview}
              alt="Image Preview"
              className="w-full md:w-full rounded-full h-full object-cover object-center cursor-pointer"
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

export default UploadKidPhoto;
