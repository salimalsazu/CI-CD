import SettingPage from "@/components/MyProfile/settings/SettingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | My Account",
};
const page = () => {
  return (
    <div>
      <SettingPage />
    </div>
  );
};

export default page;
