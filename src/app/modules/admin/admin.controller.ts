import { Request, Response } from "express";
import { adminService } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await adminService.getAllAdminFromDB(filters, options);
    res.status(200).send({
      success: true,
      message: "Admin data fetched",
      meta: result?.meta,
      data: result?.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const getAdminByIdFromDB = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const result = await adminService.getAdminByIdFromDB(req.params.id);
    res.status(200).send({
      success: true,
      message: "Admin data fetched",
      data: result,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: error?.name || "Admin data failed to fetch",
    });
  }
};

const updateAdminIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.updateAdminIntoDB(id, req.body);
    res.status(200).send({
      success: true,
      message: "Admin data fetched",
      data: result,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: error?.name || "Admin data failed to update",
    });
  }
};

export const adminController = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminIntoDB
};
