/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TaxService } from './tax.service';
import { TaxFilterableFields } from './tax.constants';


// !----------------------------------Create New Hall---------------------------------------->>>
const addTax = catchAsync(async (req: Request, res: Response) => {
  const result = await TaxService.addTax(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getTax = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, TaxFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await TaxService.getTax(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const updateTax = catchAsync(async (req: Request, res: Response) => {
  const { taxId } = req.params;
  const payload = req.body;
  const result = await TaxService.updateTax(taxId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

const deleteTax = catchAsync(async (req: Request, res: Response) => {
  const { taxId } = req.params;
  const result = await TaxService.deleteTax(taxId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

export const TaxController = {
  addTax,
  getTax,
  updateTax,
  deleteTax,
};
