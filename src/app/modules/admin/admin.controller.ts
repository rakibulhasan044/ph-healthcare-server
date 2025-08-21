import { Request, RequestHandler, Response } from "express";
import { adminService } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";


const getAllAdminFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await adminService.getAllAdminFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getAdminByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id);

  const result = await adminService.getAdminByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched",
    data: result,
  });
});

const updateAdminIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.updateAdminIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated successfully",
    data: result,
  });
});

const deleteAdminFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await adminService.deleteAdminFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  }
);

const softDeleteAdminFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await adminService.softDeleteAdminFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  }
);

export const adminController = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  softDeleteAdminFromDB,
};
