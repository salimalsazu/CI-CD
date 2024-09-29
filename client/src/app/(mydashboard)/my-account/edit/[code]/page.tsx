"use client";

import UpdateKidProfileForm from "@/components/MyProfile/CreateKidProfile/UpdateKidProfileForm";
import { useGetKidProfileQuery } from "@/redux/api/features/kids/kidApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "rsuite";

type Props = {
  params: { code: string };
};

const UpdateKidPage = ({ params }: Props) => {
  const router = useRouter();
  const [searchCode, setSearchCode] = useState("");
  const {
    data: kidDetails,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetKidProfileQuery({
    code: params?.code,
  });

  return (
    <div className="mx-auto max-w-screen-xl   sm:px-6 lg:px-8">
      {isLoading && (
        <div className="min-h-[70vh] flex justify-center items-center">
          <Loader content="Loading Details" size="md" />
        </div>
      )}

      {/* if Error occurred */}
      {!isLoading && isError && !isSuccess && (
        <div className="max-w-2xl mx-auto px-5 min-h-[50vh] max-md:px-3">
          <div className="my-6  flex justify-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              E.T. Phone Home
            </h2>
          </div>

          {/*  */}
          <div className="my-10 flex justify-center text-center ">
            <div className="space-y-3">
              <h2 className="text-xl text-wrap sm:text-3xl font-semibold">
                <span className="  block">E.T. Phone Home with Code</span>
                <span className="  block">{`"${params?.code}"`}</span>
                <span className="  block">
                  {
                    // @ts-ignore
                    error?.message || "Does Not Exist"
                  }
                </span>
              </h2>

              <p className="text-sm sm:text-[13px] text-wrap text-gray-500">
                {`Please make sure to include capital and lowercase letters. For
                example, if the code on the back of the Barcode is 'AbC12', the
                letters 'A' and 'C' need to be capitalized. Try searching for a
                different code below.`}
              </p>
            </div>
          </div>

          {/*  */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500" htmlFor="code">
              Tag Code
            </label>
            <input
              onChange={(e: any) => setSearchCode(e.target.value)}
              name="code"
              type="text"
              className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg "
            />
            <div className="pt-3">
              <button
                onClick={() => {
                  router.replace(searchCode);
                }}
                type="button"
                className="w-full bg-primary text-white rounded-lg  font-semibold shadow-xl py-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* if no error occurred */}

      {!isLoading && !isError && isSuccess && (
        <UpdateKidProfileForm kidDetails={kidDetails?.data} />
      )}
    </div>
  );
};

export default UpdateKidPage;
