import BandsList from "@/components/bands/BandsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Bands | E.T. Home Dashboard",
};
const BandsPage = () => {
  return (
    <div>
      <BandsList />
    </div>
  );
};

export default BandsPage;
