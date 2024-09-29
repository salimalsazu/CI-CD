import GetAllUsers from "@/components/userManagements/table/GetAllUsers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Dashboard",
  creator: "Developed by CodeQuivers",
};
const UserManagements = () => {
  return (
    <div>
      <GetAllUsers />
    </div>
  );
};

export default UserManagements;
