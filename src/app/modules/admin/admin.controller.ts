import { Request, Response } from "express";
import { adminService } from "./admin.services";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllAdminFromDB(req.query);
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
