import { useState, useEffect } from "react" 
import { Link } from "react-router-dom"
import axios from "axios"
import './App.css'

const API_URL = 'https://69c52ae68a5b6e2dec2bea5e.mockapi.io/api/todo/todoList'

interface TodoItem {
  id: string; 
  task_name: string;
  is_done: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([])

  async function fetchTodoList() {
    try {
      const response = await axios.get<TodoItem[]>(API_URL)
      setTodoList(response.data)
    } catch (error) {
      console.error("Error fetching todo list:", error)
    }
  }

  async function deleteTodo(taskId: string) {
    try {
      await axios.delete(`${API_URL}/${taskId}`)
      fetchTodoList()
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  useEffect(() => {
    fetchTodoList()
  }, [])

  return (
    <>
    <div>
      <h1 id="welcome">Welcome to React</h1>
      <div id="task-list">
        {todoList.map((item) => (
          <div key={item.id} className="taskBox"> 
              <div>
                {item.task_name}: {item.is_done ? 'Done' : 'Not Done'}
                <Link to={`/edit/${item.id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
                <button className="btn btn-danger" onClick={() => deleteTodo(item.id)}>
                  Delete
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App