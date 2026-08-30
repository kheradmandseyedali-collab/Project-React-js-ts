import { LucideCheckCircle, LucidePlusCircle, LucideX } from "lucide-react";
import { useEffect, useState } from "react";
import DsButton from "../../components/desing_system/DsButten";
import Loading from "../../components/global/Loading";
import { BASE_URL } from "../../constants";
import TodoItem from "./components/TodoItem";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

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
        const newItems = [
          ...todos,
          { title: formData.title, completed: formData.isCompleted },
        ];
        setTodos(newItems);

        alert("Todo added successfully");
      })
      .catch((error) => console.error(error))
      .finally(() => setFormLoading(false));
  }; // handleSubmit

  const prepareToEdit = (id) => {
    const editingItem = todos.find((x) => x.id === id);
    setEditingId(id);
    setFormData({
      title: editingItem.title,
      isCompleted: editingItem.completed,
    });
  };

  const cancelEdit = () => {
    setFormData({
      title: "",
      isCompleted: false,
    });
    setEditingId(null);
  };

  const handleUpdate = (e) => {
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

        // getTodos()

        const upadtedItems = todos.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                title: formData.title,
                completed: formData.isCompleted,
              }
            : todo,
        );
        setTodos(upadtedItems);

        alert("Todo edited successfully");
      })
      .catch((error) => console.error(error))
      .finally(() => setFormLoading(false));
  }; // handleUpdate

  const afterDelete = (id) => {
    const remainItems = todos.filter((todo) => todo.id !== id);
    setTodos(remainItems);
  };

  return (
    <section className="grid grid-cols-3 gap-12 max-w-2/3 mx-auto">
      <div className="col-span-1">
        <h1 className="text-2xl font-bold mb-4">Create Todo</h1>

        <form onSubmit={(e) => (editingId ? handleUpdate(e) : handleSubmit(e))}>
          <div className="mb-2">
            <label className="text-lg mb-1 flex justify-between items-baseline">
              Title
              {showError && (
                <span className="text-xs text-red-500">Title is Required</span>
              )}
            </label>
            <input
              type="text"
              placeholder="Enter Todo Title"
              className="w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md"
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
              <DsButton
                type="submit"
                color="green"
                size="lg"
                icon={<LucideCheckCircle size={22} />}
                text="Save"
                isLoading={formLoading}
              />
              <DsButton
                type="button"
                color="gray"
                size="lg"
                icon={<LucideX size={22} />}
                text="Cancel"
                onClick={cancelEdit}
              />
            </div>
          ) : (
            <DsButton
              type="submit"
              color="blue"
              size="lg"
              icon={<LucidePlusCircle size={22} />}
              text="Add"
              isLoading={formLoading}
            />
          )}
        </form>
      </div>

      <div className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">Todos List</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="divide-y divide-gray-500 border border-gray-300 rounded-lg overflow-hidden">
            {todos.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  todo={item}
                  prepareToEdit={prepareToEdit}
                  afterDelete={afterDelete}
                />
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Todos;
