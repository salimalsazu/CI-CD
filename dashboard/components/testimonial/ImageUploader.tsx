import { useState } from "react";
import { Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";

interface UserImageUploadProps {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
}

const UserImageUpload = ({ field }: UserImageUploadProps) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 512 * 1024; // 512 kb

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
        // toast.error("File size exceeds 512kb.");
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
    <div className="relative mt-1 group">
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
            width: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          {imagePreview ? (
            <Image
              width={20}
              height={20}
              src={imagePreview}
              alt="Image Preview"
              className=" w-[200px] rounded-full h-full object-cover object-center cursor-pointer"
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

export default UserImageUpload;
