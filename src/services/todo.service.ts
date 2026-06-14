import TodoRepo from "../repositories/todo.repository";

export default class TodoSvc {
  static createTask(data: { title: string; content?: string }) {
    return TodoRepo.createTask(data);
  }

  static update(data: {
    id: string;
    title?: string;
    content?: string;
  }) {
    return TodoRepo.update(data);
  }

  static delete(id: string) {
    return TodoRepo.delete(id);
  }

  static findAll() {
    return TodoRepo.findAll();
  }

  static findById(id: string) {
    return TodoRepo.findById(id);
  }
  static toggle(id: string, isDone: boolean) {
  return TodoRepo.toggle(id, isDone);
}
}