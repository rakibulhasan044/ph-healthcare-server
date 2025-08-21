import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllAdminFromDB);
router.get("/:id", adminController.getAdminByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  adminController.updateAdminIntoDB
);
router.delete("/:id", adminController.deleteAdminFromDB);
router.delete("/soft/:id", adminController.softDeleteAdminFromDB);

export const adminRoutes = router;
