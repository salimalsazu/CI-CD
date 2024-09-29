"use client";

import { fileUrlKey } from "@/helpers/envConfig";
import { formatDuration } from "@/utils/kidsAgeFormatter";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Modal } from "rsuite";

const ViewBandDetailsModal = ({
  isOpenView,
  setIsOpenView,
  modalData,
}: any) => {
  const fullName = `${modalData?.firstName} ${modalData?.lastName}`;

  return (
    <div>
      <Modal
        size="lg"
        open={isOpenView}
        onClose={() => setIsOpenView(false)}
        // backdrop={"static"}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-sm font-semibold">Band Details</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {" "}
            <div className="grid grid-cols-3 ">
              <div className=" col-span-1  px-10  flex justify-center items-center">
                <div className="">
                  <Image
                    className="rounded-lg  object-cover"
                    src={
                      modalData?.kidImage
                        ? `${fileUrlKey()}/${modalData?.kidImage}`
                        : "/images/defaultPhoto.webp"
                    }
                    width={1000}
                    height={1000}
                    alt="pet pic"
                  />
                </div>
              </div>

              <div className=" col-span-2 bg-white   ">
                <div className="flex flex-col justify-center items-center ">
                  <div className="">
                    <h2
                      className={`font-bold truncate px-5 ${
                        fullName?.length > 16 ? "text-xl" : "text-2xl"
                      }`}
                    >
                      {fullName || "No Name"}
                    </h2>
                  </div>
                  <div>
                    <h2>{formatDuration(modalData?.kidAge)}</h2>
                  </div>
                </div>

                <section className="mt-2">
                  <div className="grid grid-cols-12 px-3 text-sm font-bold">
                    <h4 className="col-span-3">Name</h4>
                    <h4 className="col-span-3">Relationship</h4>
                    <h4 className="col-span-2 text-center">Call</h4>
                    <h4 className="col-span-2 text-center">Text</h4>
                    <h4 className="col-span-2 text-center">Share Gps</h4>
                  </div>
                  <div className="grid grid-cols-12 px-3 text-sm mt-2 items-center gap-x-2">
                    {modalData?.relations?.length > 0 &&
                      modalData?.relations?.map(
                        (relation: any, idx: number) => (
                          <>
                            <p className="col-span-3 py-2 line-clamp-2">
                              {relation?.firstName} {relation?.lastName}
                            </p>
                            <p className="col-span-3 py-2 line-clamp-1">
                              {relation?.relation}
                            </p>
                            <div className="col-span-2 text-center py-2 flex flex-col justify-center items-center">
                              <a
                                href="tel:+1234567890"
                                className="bg-[#cdf7fece] rounded-md w-9 h-9 transition-all ease-in-out flex justify-center items-center"
                              >
                                <FiPhone size={20} className="text-primary" />
                              </a>
                            </div>
                            <div className="py-2 col-span-2 text-center">
                              <button
                                onClick={() => {
                                  // This URL scheme works for both Android and iOS
                                  const url = `sms:${relation?.phoneNo}`;

                                  // Open the messaging app
                                  window.location.href = url;
                                }}
                                className="bg-[#cdf7fece] rounded-md w-9 h-9 transition-all ease-in-out"
                              >
                                <span className="flex justify-center text-primary">
                                  <IoChatboxEllipsesOutline size={20} />
                                </span>
                              </button>
                            </div>
                            <div className="py-2 col-span-2 text-center">
                              {/* <button className="bg-[#cdf7fece] rounded-md w-9 h-9 transition-all ease-in-out">
                                <span className="flex justify-center text-primary">
                                  <GrMapLocation size={20} />
                                </span>
                              </button> */}
                              {/* <ShareGps phoneNumber="4444444" /> */}
                            </div>
                          </>
                        )
                      )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewBandDetailsModal;
