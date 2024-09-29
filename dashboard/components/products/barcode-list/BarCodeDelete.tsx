"use client";

import { useDeleteMultipleBarcodeMutation } from "@/redux/features/barCodeApi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TiWarning } from "react-icons/ti";
import { Button, Modal, Notification, useToaster } from "rsuite";

const BarCodeDelete = ({
  barcodeIds,
  cleanSelectedKeys,
}: {
  barcodeIds: string[];
  cleanSelectedKeys: any;
}) => {
  const [isDeleteOpen, setIsOpenDelete] = useState(false);
  const handleModalClose = () => {
    setIsOpenDelete(false);
  };
  //
  const [
    deleteMultipleBarcode,
    { data, isLoading, isSuccess, isError, error },
  ] = useDeleteMultipleBarcodeMutation({});
  //
  const handleDeleteAllBarcode = async () => {
    //

    await deleteMultipleBarcode({
      data: barcodeIds,
    });
  };

  // !
  const toaster = useToaster();
  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          <h4 className="font-semibold xl:text-2xl">
            {data?.message || "Barcode Deleted"}
          </h4>
        </Notification>,
        { placement: "bottomStart", duration: 2000 }
      );
      handleModalClose();
      cleanSelectedKeys();
    }
    if (!isSuccess && !isLoading && isError && error) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          <h4 className="font-semibold xl:text-2xl">
            {
              // @ts-ignore
              error?.message ?? "Delete Failed. try again !"
            }
          </h4>
        </Notification>,
        { placement: "bottomStart", duration: 4000 }
      );
    }
  }, [isSuccess, isLoading, isError, data, error, toaster, cleanSelectedKeys]);

  return (
    <div>
      <div>
        <Button
          onClick={() => setIsOpenDelete(true)}
          loading={isLoading}
          className="!bg-red-600 hover:!bg-red-700  !text-white border p-1 "
        >
          Delete All
        </Button>
      </div>

      <Modal
        overflow={false}
        size="xs"
        backdrop="static"
        dialogAs="div"
        className="bg-white mx-auto mt-20  rounded-xl"
        open={isDeleteOpen}
        onClose={handleModalClose}
      >
        <Modal.Body className="p-3 ">
          <div className="flex justify-end w-full ">
            <button
              type="button"
              onClick={handleModalClose}
              className="hover:text-[#fe0303] hover:scale-125 duration-300
            "
            >
              <IoClose size={20} />
            </button>
          </div>
          <div className=" ">
            <div className="text-center w-full mx-auto">
              <h1 className="text-xl font-semibold text-black">
                Delete Barcode ?
              </h1>
              <p className="w-[80%] mx-auto mt-3">
                Are you sure you want to delete this from database?
              </p>
            </div>
            <div className="mt-5 border p-5 border-black/10 rounded-lg">
              <h2>
                {" "}
                Your selected {""}
                <span className="text-danger font-extrabold">
                  {barcodeIds?.length}
                </span>{" "}
                Barcode Will be deleted.
              </h2>
            </div>
            <div className="p-3  mt-5 bg-[#feeddd] rounded-lg ">
              <p className="flex items-center gap-3 font-semibold text-lg text-[#b53a07]">
                {" "}
                <TiWarning /> Warning
              </p>
              <p className="text-[#b53a07] text-sm font-medium">
                By deleting this, you will not be able to undo this action
              </p>
            </div>
            <div className="mt-5 flex justify-center items-center gap-5">
              <button
                type="button"
                onClick={handleModalClose}
                className="border border-[#343b4634] text-[#29333d] font-medium duration-300 hover:bg-[#343b4627] hover:border-transparent  py-1.5 px-3 rounded-md "
              >
                No, cancel
              </button>
              <Button
                loading={isLoading}
                type="button"
                onClick={handleDeleteAllBarcode}
                className="!bg-[#c81e1f] hover:!bg-[#fe0303] !text-white !font-medium"
              >{` Yes, I'm Sure`}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BarCodeDelete;
