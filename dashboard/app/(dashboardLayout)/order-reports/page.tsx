import AllOrderList from "@/components/orders/table/AllOrdersTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Reports | Dashboard",
  creator: "Developed by CodeQuivers",
};
const OrderReportsPage = () => {
  return (
    <div>
      <AllOrderList />
    </div>
  );
};

export default OrderReportsPage;
