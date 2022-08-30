import React from 'react'
import {useState, useEffect}  from 'react'  
import axios from 'axios'
import './App.css'


function App() { 

  const [user, setUser] = useState([])
  const [name, setName] = useState('') 
  const [age, setAge] = useState(0) 
  const [newName, setNewName] = useState('')

useEffect(() => {
fetch('http://localhost:3002/users') 
.then((res) => res.json()) 
.then((res) => setUser(res))
}, [])

const sendData = () => {
  axios.post('http://localhost:3002/send', ({
    name: name, 
    age: age
  })) 
  alert("submiited")
}

const deleteUser = (id) => {
  axios.delete(`http://localhost:3002/remove/${id}`)  
  alert('deleted')
}

const updateUser = (id) => {
  axios.put("http://localhost:3002/updated", {
    id: id ,
    newName: newName
  })
}

  return (
    <div className="App"> 

      <div> 
        <input placeholder="name" onChange={(e) => setName(e.target.value)}/>
        <input placeholder="age" onChange={(e) => setAge(e.target.value)}/>
        <button onClick={sendData}>send</button>
      </div>


      <div>  
        {user && user.map((item, index) => {
          return (
            <div key={index}>
             <pre>{item.name}</pre>  
             <pre>{item.age}</pre>

             <div>
             <input onChange={(e) => setNewName(e.target.value)} placeholder="newName"/> 
             <button onClick={() => updateUser(item._id)}>update</button>
             </div>

             <button onClick={() => deleteUser(item._id)}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
