import { CirclePlus, LucideCheckCircle, LucideX } from "lucide-react";
import React, { useEffect, useState } from "react";
import Ds_Button from "../../components/desing_system/DsButton";
import Loading from "../../components/global/Loading";
import { BASE_URL } from "../../constants";
import TodoItem, { type Todo } from "./components/TodoItem";
import Button from "../../components/desing_system/button";
import { toast } from "react-toastify";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    isCompleted: false,
  });
  const [showError, setShowError] = useState(false);

  const getTodos = () => {
    fetch(`${BASE_URL}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = (e ?: React.FormEvent) => {
    if (e) e.preventDefault();

    setShowError(false);
    if (!formData.title) {
      setShowError(true);
      return;
    }

    setFormLoading(true);

    fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: formData.title,
        completed: formData.isCompleted,
      }),
    })
      .then((res) => {
        console.log(res);
        const newItems: Todo[] = [
          ...todos,
          {
            id: Date.now(),
            title: formData.title,
            completed: formData.isCompleted,
          },
        ];
        setTodos(newItems);
        setFormData({ title: "", isCompleted: false });

        toast.success("Todo added successfully");
      })
      .catch((error) => console.error(error))
      .finally(() => setFormLoading(false));
  };

  const prepareToEdit = (id: number | string) => {
    const editingItem = todos.find((x) => x.id === id);
    if (!editingItem) return;

    setEditingId(id);
    setFormData({
      title: editingItem.title || editingItem.todo || "",
      isCompleted: !!editingItem.completed,
    });
  };

  const cancelEdit = () => {
    setFormData({
      title: "",
      isCompleted: false,
    });
    setEditingId(null);
    toast.error("CANCEL EDIT");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    setShowError(false);
    if (!formData.title) {
      setShowError(true);
      return;
    }

    setFormLoading(true);

    fetch(`${BASE_URL}/todos/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: formData.title,
        completed: formData.isCompleted,
      }),
    })
      .then((res) => {
        console.log(res);

        const updatedItems = todos.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                title: formData.title,
                completed: formData.isCompleted,
              }
            : todo,
        );
        setTodos(updatedItems);
        setEditingId(null);
        setFormData({ title: "", isCompleted: false });

        toast.success("Todo edited successfully");
      })
      .catch((error) => console.error(error))
      .finally(() => setFormLoading(false));
  };

  const afterDelete = (id: number | string) => {
    const remainItems = todos.filter((todo) => todo.id !== id);
    setTodos(remainItems);
  };

  return (
    <section className="grid grid-cols-3 gap-12 max-w-2/3 mx-auto">
      <div className="col-span-1">
        <div>
          <h1 className="text-2xl font-bold mb-4">Create Todo</h1>

          <form
            onSubmit={(e) => (editingId ? handleUpdate(e) : handleSubmit(e))}
          >
            <div className="mb-2">
              <label className="text-lg mb-1 flex justify-between items-baseline">
                Title
                {showError && (
                  <span className="text-xs text-red-500">
                    Title is Required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder="Enter Todo Title"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-lg rounded-md text-gray-900 dark:text-white transition-colors"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="text-lg flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={formData.isCompleted}
                  onChange={(e) =>
                    setFormData({ ...formData, isCompleted: e.target.checked })
                  }
                />
                Completed
              </label>
            </div>
            {editingId ? (
              <div className="flex gap-2">
                <Ds_Button
                  type="submit"
                  color="success"
                  size="large"
                  startIcon={<LucideCheckCircle size={22} />}
                  loading={formLoading}
                  className="flex justify-center items-center gap-1"
                >
                  Save
                </Ds_Button>
                <Ds_Button
                  type="button"
                  color="secondary"
                  size="large"
                  startIcon={<LucideX size={22} />}
                  onClick={cancelEdit}
                  className="flex justify-center items-center gap-1"
                >
                  Cancel
                </Ds_Button>
              </div>
            ) : (
              <Button
                type="submit"
                className="flex justify-center items-center gap-1"
                color="blue"
                size="lg"
                icon={<CirclePlus />}
                text="Add"
              />
            )}
          </form>
        </div>
      </div>

      <div className="col-span-2 w-190">
        <h1 className="text-2xl font-bold mb-4">Todos List</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="divide-y divide-gray-500 border border-gray-200 rounded-lg overflow-hidden">
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                todo={item}
                prepareToEdit={prepareToEdit}
                afterDelete={afterDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Todos ;