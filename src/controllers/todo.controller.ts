import { Request, Response } from "express";
import Joi from "joi";
import TodoSvc from "../services/todo.service";

export default class TodoCtrl {
  static async createTask(req: Request, res: Response) {
    const { title, content } = req.body;

    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().optional(),
    });

    const { error } = schema.validate({ title, content });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await TodoSvc.createTask({ title, content });
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async update(req: Request, res: Response) {
    const { title, content } = req.body;
    const id = req.params.id;

    try {
      const result = await TodoSvc.update({
        id,
        title,
        content,
      });
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const result = await TodoSvc.delete(id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const result = await TodoSvc.findAll();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const result = await TodoSvc.findById(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async toggle(req: Request, res: Response) {
  const id = req.params.id;
  const { isDone } = req.body;

  try {
    const result = await TodoSvc.toggle(id, isDone);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
    }
  }
}