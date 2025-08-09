import { Admin, Prisma } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import calculatePagination from "../../../utils/paginationHelper";
import prisma from "../../../shared/prisma";

const getAllAdminFromDB = async (params: any, options: any) => {
  const { limit, page, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params?.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCond: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereCond,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereCond,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAdminByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateAdminIntoDB = async (id: string, data: Partial<Admin>) => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const adminService = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminIntoDB,
};
