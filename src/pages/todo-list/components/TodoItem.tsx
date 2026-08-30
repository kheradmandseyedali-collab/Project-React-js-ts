import {
  LucideCheckCircle,
  LucidePencil,
  LucideTrash,
  LucideUndo,
} from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../../../constants";
import DsButton from "../../../components/desing_system/DsButten";

const TodoItem = ({ todo , prepareToEdit , afterDelete }) => {
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

        // getTodos()
        afterDelete(todo.id);
        alert("Todo deleted successfully");
      })
      .catch((error) => console.error(error))
      .finally(() => setDeleteLoading(false));
  }; // handleDelete

  const handleChangeStatus = (newStatus) => {
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

        // getTodos()

        // const upadtedItems = todos.map((todo) => todo.id === editingId ? { ...todo, title: formData.title, completed: formData.isCompleted } : todo);
        // setTodos(upadtedItems)

        // alert('Todo edited successfully');

        todo.completed = newStatus;
      })
      .catch((error) => console.error(error))
      .finally(() => setStatusLoading(false));
  }; // handleUpdate

  return (
    <li className="flex justify-between px-4 py-2 transition-all hover:bg-gray-800">
      <p
        className={`text-base ${todo.completed ? "line-through opacity-50" : ""}`}
      >
        {todo.title}
      </p>
      <div className="flex gap-1">
        {todo.completed ? (
          <DsButton
            color="gray"
            size="sm"
            icon={<LucideUndo />}
            justIcon
            tooltip="Uncomplete"
            isLoading={statusLoading}
            onClick={() => handleChangeStatus(false)}
          />
        ) : (
          <DsButton
            color="green"
            size="sm"
            icon={<LucideCheckCircle />}
            justIcon
            tooltip="Completed"
            isLoading={statusLoading}
            onClick={() => handleChangeStatus(true)}
          />
        )}
        <DsButton
          color="blue"
          size="sm"
          icon={<LucidePencil />}
          justIcon
          onClick={() => prepareToEdit(todo.id)}
          tooltip="Edit"
        />
        <DsButton
          color="red"
          size="sm"
          icon={<LucideTrash />}
          justIcon
          isLoading={deleteLoading}
          onClick={handleDelete}
          tooltip="Delete"
        />
      </div>
    </li>
  );
};

export default TodoItem;
