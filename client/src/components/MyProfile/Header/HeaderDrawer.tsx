import Link from "next/link";
import React from "react";
import { Accordion, Drawer, Placeholder } from "rsuite";

const HeaderDrawer = ({ open, setOpen }: any) => {
  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)} size={"xs"}>
        <Drawer.Body style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="flex justify-around flex-col">
            <div className="flex flex-col justify-center md:justify-start items-center  md:items-start bg-white gap-6 p-10">
              <Accordion className="!w-full !p-0 !m-0">
                <Accordion.Panel
                  defaultExpanded
                  className="!text-2xl"
                  header={
                    <div className="text-2xl text-gray-900 transition hover:text-gray-900/75">
                      Welcome
                    </div>
                  }
                >
                  <div className="flex flex-col gap-4">
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="/my-account"
                    >
                      {" "}
                      Home{" "}
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="/my-account/my-kids"
                    >
                      {" "}
                      My Kids{" "}
                    </Link>
                  </div>
                </Accordion.Panel>
                <Accordion.Panel
                  className="!text-2xl"
                  header={
                    <div className="text-2xl text-gray-900 transition hover:text-gray-900/75">
                      Shop
                    </div>
                  }
                >
                  <div className="flex flex-col gap-4">
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="#"
                    >
                      {" "}
                      Backup Buddy{" "}
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="#"
                    >
                      {" "}
                      I.C.E{" "}
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="#"
                    >
                      {" "}
                      Active{" "}
                    </Link>
                  </div>
                </Accordion.Panel>
                <Accordion.Panel
                  className="!text-2xl"
                  header={
                    <div className="text-2xl text-gray-900 transition hover:text-gray-900/75">
                      Support
                    </div>
                  }
                >
                  <div className="flex flex-col gap-4">
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="/reviews"
                    >
                      {" "}
                      Reviews{" "}
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="#"
                    >
                      {" "}
                      Support{" "}
                      <Accordion.Panel>
                        <div>
                          <h2>help</h2>
                        </div>
                      </Accordion.Panel>
                    </Link>
                  </div>
                </Accordion.Panel>
              </Accordion>

              {/* <Link
              onClick={() => setOpen(false)}
              className="text-2xl text-gray-900 transition hover:text-gray-900/75"
              href="#"
            >
              {" "}
              Reviews{" "}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-2xl text-gray-900 transition hover:text-gray-900/75"
              href="#"
            >
              {" "}
              Support{" "}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-2xl text-gray-900 transition hover:text-gray-900/75"
              href="#"
            >
              {" "}
              Blog{" "}
            </Link> */}
            </div>
            <div className="mt-24 md:mt-96 mx-auto flex justify-between items-center gap-5">
              <Link
                onClick={() => setOpen(false)}
                href="/sign-in"
                className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-black shadow hover:text-gray-100 hover:bg-blue-500"
              >
                Sign In
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/sign-up"
                className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-black shadow hover:text-gray-100 hover:bg-blue-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default HeaderDrawer;
