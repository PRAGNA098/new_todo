type TaskStatus = "todo" | "in-progress" |  "done";

interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

let nextId = 1;

export function addTask(tasks: Task[], title: string): Task[] {
    const newTask: Task = {
        id: nextId++,
        title,
        status: "todo",
    };
    return [...tasks, newTask];
}

export function completeTask(tasks: Task[], id: number): Task[] {
    return tasks.map((task) =>
        task.id === id ? { ...task, status: "done" } : task);
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
    return tasks.filter((task) => task.status === status);
}

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

/**
 * Advances a task's status sequentially: "todo" -> "in-progress" -> "done".
 */
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) return task;

    let nextStatus: TaskStatus = task.status;
    if (task.status === "todo") {
      nextStatus = "in-progress";
    } else if (task.status === "in-progress") {
      nextStatus = "done";
    }

    return { ...task, status: nextStatus };
  });
}

/**
 * Returns the total count of tasks matching a given status.
 */
export function countByStatus(tasks: Task[], status: TaskStatus): number {
    return filterByStatus(tasks, status).length;
}