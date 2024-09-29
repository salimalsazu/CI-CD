import { getClientUrl } from "@/helpers/envConfig";
import { saveAs } from "file-saver";
import moment from "moment";

export const saveCSV = ({
  checkedBoxData,
  columns,
  allBarCodeList,
}: {
  checkedBoxData: string[];
  columns: any[];
  allBarCodeList: any;
}) => {

  try {
    const fileName = "Product_File";

    // Generate headers from the columns
    const headers = columns.map((col) => col.header).join(",");

    // Generate rows based on either checkedBoxData or allBarCodeList
    const rows = (
      checkedBoxData?.length > 0 ? checkedBoxData : allBarCodeList?.data
    )?.map((singleData: any) => {
      const customRows = {
        productName: singleData.variant.product.productName,
        productColor: singleData.variant.color.name,
        qrCodeLink: `${getClientUrl()}/tag/${singleData.code}`,
        barcodeStatus: singleData.barcodeStatus,
        createdAt: moment(singleData.createdAt).format("DD MMMM YYYY"),
      };

      // Convert each custom row to a CSV-friendly string (each value separated by a comma)
      return Object.values(customRows).join(",");
    });

    // Combine the headers and rows into the final CSV string
    const csvContent = [headers, ...rows].join("\n");

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Use `file-saver` to trigger the download
    saveAs(blob, `${fileName}.csv`);
  } catch (error) {
    console.error("<<<ERROR>>>", error);
  }
};
