/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BarcodeService } from './barcode.service';
import { BarcodeFilterableFields } from './barcode.constant';
import pick from '../../../shared/pick';

const getProductBarcodeVarientWise = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BarcodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BarcodeService.getProductBarcodeVarientWise(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Barcode fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Category---------------------------------------->>>
const getSingleBarCodeDetailsForKid = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.params;

  const result = await BarcodeService.getSingleBarCodeDetailsForKid(code);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Kid Details retrieved successfully',
    data: result,
  });
});
//
const getAvailableBarCode = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.query as any;

  const result = await BarcodeService.getAvailableBarCode(code);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'This Barcode is Available.',
    data: result,
  });
});

const getAllBarCodeForPrint = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BarcodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BarcodeService.getAllBarCodeForPrint(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Barcode fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleVariant = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BarcodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const { variantId } = req.params;
  // console.log('variantId', variantId);

  const result = await BarcodeService.getSingleVariant(variantId, filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Barcode Link retrieved successfully',
    data: result,
  });
});

const singleBarcodeUpdate = catchAsync(async (req: Request, res: Response) => {
  const { barcodeId } = req.params;
  const data = req.body;

  console.log(data, 'req.body');

  const result = await BarcodeService.singleBarcodeUpdate(barcodeId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Barcode Updated successfully',
    data: result,
  });
});

const deleteBarcode = catchAsync(async (req: Request, res: Response) => {
  const { barcodeId } = req.params;
  const result = await BarcodeService.deleteBarcode(barcodeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Barcode Deleted successfully',
    data: result,
  });
});

const deleteMultipleBarcode = catchAsync(async (req: Request, res: Response) => {
  const { barcodeIds } = req.body;

  const result = await BarcodeService.deleteMultipleBarcode(barcodeIds);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Barcode Deleted successfully',
    data: result,
  });
});

const addBarCode = catchAsync(async (req: Request, res: Response) => {
  const data = req?.body;
  const result = await BarcodeService.addBarCode(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stock Added Successfully',
    data: result,
  });
});
// ! create qr code manually
const createQrCodeManually = catchAsync(async (req: Request, res: Response) => {
  const data = req?.body;
  const result = await BarcodeService.createQrCodeManually(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Qr Code Added Successfully',
    data: result,
  });
});

export const BarcodeController = {
  getSingleBarCodeDetailsForKid,
  getProductBarcodeVarientWise,
  getAllBarCodeForPrint,
  getAvailableBarCode,
  getSingleVariant,
  singleBarcodeUpdate,
  deleteBarcode,
  deleteMultipleBarcode,
  addBarCode,
  createQrCodeManually,
};
