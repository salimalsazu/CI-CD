// import dynamic from "next/dynamic";

// const KidLayoutNavbar = dynamic(
//   () => import("@/components/kidDetails/KidLayoutNavbar"),
//   { ssr: false }
// );

const KidDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <div className="fixed top-2 w-full z-10">
        <KidLayoutNavbar />
      </div> */}
      <div>{children}</div>
    </div>
  );
};

export default KidDetailsLayout;
