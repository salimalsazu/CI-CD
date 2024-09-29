import MyAllKids from "@/components/MyProfile/my-kids/MyAllKids";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bands | E.T.Phone Home",
};

const MyKidsPage = () => {
  return (
    <section className="mx-auto max-md:my-2 ">
      <MyAllKids />
    </section>
  );
};

export default MyKidsPage;
