import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = 'https://69c52ae68a5b6e2dec2bea5e.mockapi.io/api/todo/todoList';

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [todo, setTodo] = useState({ task_name: "", is_done: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_URL}/${id}`);
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todo:", error);
      alert("Failed to load todo.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await axios.put(`${API_URL}/${id}`, todo);
      alert("Updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <p>Loading task details...</p>;

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Edit Todo</h1>
      </Link>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Current Task:</strong> {todo.task_name}
      </div>
      
      <p>Editing ID: {id}</p>

      <section>
        <input 
          type="text" 
          name="task_name" 
          value={todo.task_name} 
          onChange={handleChange} 
          placeholder="Task name"
        />
        
        <label style={{ margin: '0 10px' }}>
          <input 
            type="checkbox" 
            name="is_done" 
            checked={todo.is_done} 
            onChange={handleChange} 
          />
          Completed
        </label>

        <button 
          onClick={handleUpdate} 
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Update"}
        </button>
      </section>
    </div>
  );
}

export default EditTodo;