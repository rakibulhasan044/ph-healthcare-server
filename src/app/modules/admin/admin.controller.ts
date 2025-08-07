import { Request, Response } from "express";
import { adminService } from "./admin.services";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  const result = await adminService.getAllAdminFromDB();
  res.status(200).send({
    success: true,
    message: "Admin data fetched",
    data: result,
  });
};

export const adminController = {
  getAllAdminFromDB,
};
