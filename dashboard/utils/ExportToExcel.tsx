import { getClientUrl } from "@/helpers/envConfig";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import moment from "moment";
//
const workbook = new Excel.Workbook();

//
export const saveExcel = async ({
  checkedBoxData,
  columns,
  allBarCodeList,
}: {
  checkedBoxData: string[];
  columns: any[];
  allBarCodeList: any;
}) => {


  try {
    const fileName = "Product File";

    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet("workSheetName");

    // each columns contains header and its mapping key from data
    worksheet.columns = columns;

    // loop through all of the columns and set the alignment with width.
    worksheet.columns?.forEach((column: any) => {
      column.width = column?.header?.length + 5;
      column.alignment = { horizontal: "center" };
    });

    checkedBoxData?.length > 0
      ? checkedBoxData?.forEach((singleData: any) => {
          const customRows = {
            productName: singleData.variant.product.productName,
            productColor: singleData.variant.color.name,
            // productSize: singleData.variant.size
            //   ? singleData.variant.size
            //   : "No Size",
            qrCodeLink: `${getClientUrl()}/tag/${singleData.code}`,
            barcodeStatus: singleData.barcodeStatus,
            createdAt: moment(singleData.createdAt).format("DD MMMM YYYY"),
          };
          worksheet.addRow(customRows);
        })
      : allBarCodeList?.data?.forEach((singleData: any) => {
          const customRows = {
            productName: singleData.variant.product.productName,
            productColor: singleData.variant.color.name,
            // productSize: singleData.variant.size
            //   ? singleData.variant.size
            //   : "No Size",
            qrCodeLink: `${getClientUrl()}/tag/${singleData.code}`,
            tagCode: singleData.code,
            barcodeStatus: singleData.barcodeStatus,
            createdAt: moment(singleData.createdAt).format("DD MMMM YYYY"),
          };
          worksheet.addRow(customRows);
        });

    // Add style
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true }; // Font styling
    headerRow.height = 30;
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    // loop through all of the rows and set the outline style.
    worksheet.eachRow({ includeEmpty: false }, (row) => {
      // store each cell to currentCell
      // @ts-ignore
      const currentCell = row?._cells;

      // loop through currentCell to apply border only for the non-empty cell of excel
      currentCell.forEach((singleCell: any) => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell._address;

        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer();

    // download the processed file
    saveAs(new Blob([buf]), `${fileName}.xlsx`);
  } catch (error) {
    console.error("<<<ERROR>>>", error);
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet("workSheetName");
  }
};
