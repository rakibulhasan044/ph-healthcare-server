import { Request, Response } from "express";
import { adminService } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";


const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableField);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options);
    const result = await adminService.getAllAdminFromDB(filters, options);
    res.status(200).send({
      success: true,
      message: "Admin data fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

export const adminController = {
  getAllAdminFromDB,
};
