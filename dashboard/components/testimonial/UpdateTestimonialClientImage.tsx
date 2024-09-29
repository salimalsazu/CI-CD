import { useState } from "react";
import { Message, Uploader, useToaster } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import Image from "next/image";
import { fileUrlKey } from "@/helpers/envConfig";

interface StyleImageUploadProps {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
  defaultImage: string;
}

const UpdateTestimonialClientImage = ({
  field,
  defaultImage,
}: StyleImageUploadProps) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);
  const toaster = useToaster();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    (!fileValue?.length && `${fileUrlKey()}/${defaultImage}`) || undefined
  );

  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 5 * 1024 * 1024; // 5 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit &&
        latestFile.blobFile?.type.startsWith("image/")
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
          <Message bordered showIcon type="error" closable>
            <h4 className="font-semibold ">
              Image should be less than 5 MB and must be in image format
            </h4>
          </Message>,
          { placement: "topEnd", duration: 2000 }
        );
      }
    } else {
      clearImagePreview();
    }
  };

  const clearImagePreview = () => {
    setImagePreview(`${fileUrlKey()}/${defaultImage}`);
    field.onChange(undefined);
    setFileValue([]);
  };

  return (
    <div className="relative group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeImages}
        draggable
        autoUpload={false}
        action={""}
        onRemove={clearImagePreview}
        className="w-full"
        accept="image/*"
      >
        {imagePreview ? (
          <div
            style={{
              height: 200,
              width: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            <Image
              width={200}
              height={200}
              src={imagePreview}
              alt="Image Preview"
              className=" w-[200px] rounded-[20px] h-full object-cover object-center cursor-pointer"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>Click or Drag files to this area to upload</span>
          </div>
        )}
      </Uploader>
    </div>
  );
};

export default UpdateTestimonialClientImage;
