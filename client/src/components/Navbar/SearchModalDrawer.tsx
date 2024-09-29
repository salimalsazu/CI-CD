import React, { useState } from "react";
import { Drawer, Placeholder } from "rsuite";

const SearchModalDrawer = ({ searchOpen, setSearchOpen }: any) => {
  // const [placement, setPlacement] = useState("top");
  return (
    <Drawer
      placement="top"
      open={searchOpen}
      onClose={() => setSearchOpen(false)}
      size={"xs"}
    >
      <Drawer.Body>
        <div className="flex justify-center items-center pt-20">
          <div className="items-center pl-2 md:w-[60%]">
            <div className="flex px-6 py-2 border border-gray-700 rounded-full ">
              <input
                type="text"
                className="w-full pr-4 text-sm text-secondary  placeholder-text-100 outline-none"
                placeholder="search..."
              />
              <button className="flex items-center text-gray-700   hover:text-primary">
                <span className="mr-1 ml-2">Go</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default SearchModalDrawer;
