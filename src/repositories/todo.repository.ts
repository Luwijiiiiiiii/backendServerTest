import { prisma } from "../utils/prisma";

export default class TodoRepo {
  static async createTask(data: {
    title: string;
    content?: string;
  }) {
    return await prisma.todo.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  static async update(data: {
    id: string;
    title?: string;
    content?: string;
  }) {
    return await prisma.todo.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  static async delete(id: string) {
    await prisma.todo.delete({
      where: { id },
    });

    return "Deleted successfully";
  }

  static async findAll() {
    return await prisma.todo.findMany();
  }

  static async findById(id: string) {
    return await prisma.todo.findUnique({
      where: { id },
    });
  }
}