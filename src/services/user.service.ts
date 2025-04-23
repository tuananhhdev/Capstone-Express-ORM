import { Request } from "express";
import prisma from "../common/prisma/init.prisma";

export const userService = {
  create: async function (req: Request) {
    return `This action create`;
  },

  findAll: async function (req: Request) {
    const users = await prisma.users.findMany();
    return users;
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
