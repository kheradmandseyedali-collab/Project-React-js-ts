import {
  LucideCheckCircle,
  LucidePencil,
  LucideTrash,
  LucideUndo,
} from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../../../constants";
import { toast } from "react-toastify";
import Button from "../../../components/desing_system/button";

export type Todo = {
  id: number | string;
  title?: string;
  todo?: string;
  completed?: boolean;
};

type TodoItemProps = {
  todo: Todo;
  prepareToEdit: (id: number | string) => void;
  afterDelete: (id: number | string) => void;
};

const TodoItem = ({ todo, prepareToEdit, afterDelete }: TodoItemProps) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const handleDelete = () => {
    if (!window.confirm("Are you sure to delete this item?")) {
      return;
    }

    setDeleteLoading(true);
    fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        afterDelete(todo.id);
        toast.success("Todo deleted successfully");
      })
      .catch((error) => console.error(error))
      .finally(() => setDeleteLoading(false));
  };

  const handleChangeStatus = (newStatus: boolean) => {
    setStatusLoading(true);

    fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        completed: newStatus,
      }),
    })
      .then((res) => {
        console.log(res);
        todo.completed = newStatus;
      })
      .catch((error) => console.error(error))
      .finally(() => setStatusLoading(false));
  };

  const edit = () => {
    prepareToEdit(todo.id);
  };

  return (
    <li className="flex justify-between px-4 py-2 transition-all bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-slate-700 rounded-md">
      <p
        className={`text-base ${
          todo.completed ? "relative line-through opacity-50" : ""
        }`}
      >
        {todo.title || todo.todo}
      </p>
      <div className="flex gap-1">
        {todo.completed ? (
          <Button
            color="gray_2"
            size="xxl"
            icon={statusLoading ? undefined : <LucideUndo size={18.5} />}
            justIcon
            tooltip="Uncomplete"
            isLoading={statusLoading}
            onClick={() => handleChangeStatus(false)}
          />
        ) : (
          <Button
            color="green_2"
            size="xxl"
            icon={statusLoading ? undefined : <LucideCheckCircle size={18.5} />}
            tooltip="Completed"
            isLoading={statusLoading}
            onClick={() => handleChangeStatus(true)}
          />
        )}
        <Button
          color="blue_2"
          size="xxl"
          icon={<LucidePencil size={18.5} />}
          onClick={edit}
          tooltip="Edit"
        />
        <Button
          color="red_2"
          size="xxl"
          icon={<LucideTrash size={18.5} />}
          isLoading={deleteLoading}
          onClick={handleDelete}
          tooltip="Delete"
        />
      </div>
    </li>
  );
};

export default TodoItem ;