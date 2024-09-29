"use client";

import "react-quill/dist/quill.snow.css"; // Import Snow theme CSS (base theme)
import "react-quill/dist/quill.bubble.css"; // Import Bubble theme CSS
import { useMemo } from "react";
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ size: ["small", true, "large", "huge"] }],
    [{ list: "bullet" }],
    [{ align: [] }],
    ["link"],
    ["blockquote"],
    ["clean"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "indent",
  "list",
  "bullet",
  "size",
  "align",
  "link",
  "blockquote",
];

const AddDescriptionEditor = ({ field }: any) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="min-h-[550px] ">
      <div className="w-full rounded-none focus:outline-none  ">
        <ReactQuill
          style={{ backgroundColor: "white" }}
          className="w-full h-[500px]"
          onChange={(e) => field.onChange(e)}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
};

export default AddDescriptionEditor;
