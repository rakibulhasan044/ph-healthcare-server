import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const getAllAdminFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const getAdminByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params.id);
  try {
    const result = await adminService.getAdminByIdFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdminIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.updateAdminIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdminFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteAdminFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const softDeleteAdminFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.softDeleteAdminFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const adminController = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  softDeleteAdminFromDB,
};
