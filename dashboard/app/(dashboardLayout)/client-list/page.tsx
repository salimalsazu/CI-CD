import AllClientListTable from "@/components/client-list/AllClientListTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client List | Dashboard",
  creator: "Developed by CodeQuivers",
};
const ClientListPage = () => {
  return (
    <div>
      <AllClientListTable />
    </div>
  );
};

export default ClientListPage;
