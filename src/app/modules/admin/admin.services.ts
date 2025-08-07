import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any) => {
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params?.searchTerm) {
    andConditions.push({
      OR: ['name', 'email'].map((field) => ({
        [field]: {
            contains: params.searchTerm,
            mode: "insensitive"
        }
      }))
    });
  }

  const whereCond: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereCond,
  });
  return result;
};

export const adminService = {
  getAllAdminFromDB,
};
