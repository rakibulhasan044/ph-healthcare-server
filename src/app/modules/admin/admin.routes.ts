import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAllAdminFromDB);
router.get("/:id", adminController.getAdminByIdFromDB);
router.patch("/:id", adminController.updateAdminIntoDB);
router.delete("/:id", adminController.deleteAdminFromDB);
router.delete("/soft/:id", adminController.softDeleteAdminFromDB);

export const adminRoutes = router;
