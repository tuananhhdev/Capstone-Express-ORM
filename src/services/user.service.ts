import { Request } from "express";
import prisma from "../common/prisma/init.prisma";

export const userService = {
  create: async function (req: Request) {
    return `This action create`;
  },

  findAll: async (req: Request) => {
    const {
      page: pageStr,
      pageSize: pageSizeStr,
      search: searchStr,
    } = req.query;

    const page = pageStr ? parseInt(pageStr as string, 10) : 1;
    const pageSize = pageSizeStr ? parseInt(pageSizeStr as string, 10) : 5;

    const normalizedPage = page > 0 ? page : 1;
    const normalizedPageSize = pageSize > 0 ? pageSize : 5;

    const search = typeof searchStr === "string" ? searchStr : "";

    const skip = (normalizedPage - 1) * normalizedPageSize;

    const where = search ? { full_name: { contains: search } } : {};

    const users = await prisma.users.findMany({
      skip,
      take: normalizedPageSize,
      orderBy: { createdAt: "desc" },
      where,
    });

    const totalItems = await prisma.users.count({ where });

    const totalPage = Math.ceil(totalItems / normalizedPageSize);

    return {
      page: normalizedPage,
      pageSize: normalizedPageSize,
      totalItem: totalItems,
      totalPage,
      items: users,
    };
  },

  findOne: async function (req: Request) {
    return `This action returns a id: ${req.params.id} user`;
  },

  update: async function (req: Request) {
    return `This action updates a id: ${req.params.id} user`;
  },

  remove: async function (req: Request) {
    return `This action removes a id: ${req.params.id} user`;
  },
};
