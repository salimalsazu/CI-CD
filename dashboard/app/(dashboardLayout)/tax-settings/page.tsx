import AddTaxForm from "@/components/tax-setting/AddTaxForm";
import TaxTableList from "@/components/tax-setting/TaxTableList";

const TaxSettingPage = () => {
  return (
    <div>
      <div>
        <AddTaxForm />
      </div>
      <div>
        <TaxTableList />
      </div>
    </div>
  );
};

export default TaxSettingPage;
