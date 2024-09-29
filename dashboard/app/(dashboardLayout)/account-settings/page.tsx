import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import AccountSettingForm from "@/components/account-setting/AccountSettingForm";
export const metadata: Metadata = {
  title: "Settings | Dashboard",
  description: "This Setting page is for Admin",
};

const Settings = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div>
          <Breadcrumb pageName="Account Settings" />
        </div>
        <div>
          <AccountSettingForm />
        </div>
      </div>
    </>
  );
};

export default Settings;
