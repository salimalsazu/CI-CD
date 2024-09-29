import ContactInfo from "@/components/MyProfile/settings/ContactInfo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Info | My Account",
};

const page = () => {
  return (
    <div>
      <ContactInfo />
    </div>
  );
};

export default page;
