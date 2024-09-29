"use client";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";

const AddProductUpload = ({ field }: any) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);

  const handleChangeImages = (files: FileType[]) => {
    if (files.length === 0) {
      setFileValue([]);
      field.onChange([]);
    }

    const latestFile = files[files.length - 1];
    const fileSizeLimit = 512 * 10 * 1024; // 10 MB

    if (
      latestFile?.blobFile?.size &&
      latestFile?.blobFile?.size <= fileSizeLimit
    ) {
      setFileValue(files);
      field.onChange(files);

      const file = latestFile;
      const reader = new FileReader();
      reader.readAsDataURL(file.blobFile as File);
    } else {
      // clearImagePreview();
    }
  };

  return (
    <div>
      <Uploader
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: "10px",
        }}
        // style={{ width: "100%" }}
        listType="picture"
        fileList={fileValue}
        onChange={handleChangeImages}
        autoUpload={false}
        draggable
        multiple
        as={"div"}
        action={""}
        accept="image/*"
      >
        <div
          style={{
            padding: "20px",
            paddingBottom: "30px",
            paddingTop: "30px",
            width: "100%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IoCloudUploadOutline size={30} />
          <p className="text-[#2563eb] underline font-medium ">
            Click to upload <span>or</span>
          </p>
          <p>drag and drop</p>
        </div>
      </Uploader>
    </div>
  );
};

export default AddProductUpload;
