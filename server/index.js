//reactNode 
const express = require('express') 
const app = express() 
const cors = require('cors') 
const mongoose = require('mongoose')
const userModel = require("./model/userModel") 


app.use(express.json()) 
app.use(cors()) 

mongoose.connect('mongodb://localhost/reactNode', () => console.log('connected database'));

app.get("/users",  (_, res) => {
   userModel.find({}, (err, result) => {
    if(err) {
        res.send(err)
    }
    res.send(result)
   })
})

app.post("/send", async(req, res) => {
    let {name, age} = req.body 

    let user = new userModel({
        name: name, 
        age: age 
    })

    try { 
        let saved = await user.save() 
        console.log(saved)
    }catch(err){
        console.log(err)
    }
})


app.delete("/remove/:id", async(req, _) => {
    let id = req.params.id 
    await userModel.findByIdAndRemove(id).exec() 
})


app.put("/updated", async(req, res) => {
  let {newName, id} = req.body 

  try {
    await userModel.findById(id, (_, updatedName) => {
        updatedName.name = newName 
        updatedName.save()
    })

  }catch(err) {
    res.send(err)
  }
})

app.listen(3002, () => console.log("server running on port 3002"))