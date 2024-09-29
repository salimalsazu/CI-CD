"use client";

import { useDeleteKidMutation } from "@/redux/api/features/kids/kidApi";
import { useEffect } from "react";
import { Button, Message, Modal, useToaster } from "rsuite";

const DeleteKidConfirmationModal = ({
  handleClose,
  open,
  deleteData,
}: {
  handleClose: any;
  open: boolean;
  deleteData: any;
}) => {
  const [deleteKid, { data, isSuccess, isError, isLoading, error, reset }] =
    useDeleteKidMutation();

  const toaster = useToaster();

  const handleDeleteComment = async () => {
    await deleteKid({ kidId: deleteData?.kidId });
  };
  // ! side Effect
  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Deleted"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      handleClose();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Delete Failed"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    data?.message,
    error,
    handleClose,
    isError,
    isLoading,
    isSuccess,
    reset,
    toaster,
  ]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Are You Sure want to Delete This Kid ??</p>
          </div>
          <div className="mt-10 flex justify-end items-center gap-5">
            <button
              onClick={handleClose}
              type="button"
              className="px-5 bg-slate-400 rounded-2xl py-1.5 text-white"
            >
              Cancel
            </button>
            <Button
              type="button"
              onClick={handleDeleteComment}
              loading={isLoading}
              size="lg"
              className="!px-5 !bg-primary !rounded-2xl !py-2 !text-white"
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteKidConfirmationModal;
