import { useState, useEffect, use } from "react" 
import axios from "axios"

const API_URL = 'https://69c52ae68a5b6e2dec2bea5e.mockapi.io/api/todo/todoList'


function App() {
  const [todoList, setTodoList] = useState([])

  async function fetchTodoList() {
    try {
      const response = await axios.get(API_URL)
      setTodoList(response.data)
    } catch (error) {
      console.error("Error fetching todo list:", error)
    }
    
  }

  async function deleteTodo(taskId) {
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
      <h1>Welcome to React</h1>
      <div>
        {todoList.map((item) => (
          <div>
            <p>
              {item.task_name}: {item.is_done ? 'Done' : 'Not Done'}
              <button>Edit</button>
              <button
                onClick={() => deleteTodo(item.id)}
              >
                Delete
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
