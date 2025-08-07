import { Request, Response } from "express";
import { adminService } from "./admin.services";
import pick from "../../../shared/pick";


const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, [
      "name",
      "email",
      "contactNumber",
      "name",
      "searchTerm",
    ]);
    const result = await adminService.getAllAdminFromDB(filters);
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
