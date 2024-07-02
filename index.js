const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io')

const print = console.log;
//use cors
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000' 
  }
})

//post images
//set up storage for  multer
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//multer instance that takes in storage
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.send(JSON.stringify({ Content: "no file uploaded" }));
    res.end();
  } else {
    res.send(JSON.stringify({ "Content-Type": " successfully uploaded" }));
    res.end();
  }
});

//use body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser)
const Controller = require("./Controller");


let users = []
io.on('connection', (socket)=>{
  
socket.on('active', id=>{
  users[id] = socket.id;
}) 

  socket.on('sendMessage', (objMessage)=>{
    const {to} = objMessage;
     io.to(users[to]).emit("sendMessage",  objMessage)

  })
})





// get all agents
app.get("/api/gethookedAgents", async (req, res) => {
  let response = await Controller.getAgents();
  res.end(JSON.stringify(response));
});

//get single agent
app.get("/api/gethookedAgents/:email", async (req, res) => {
  try {
    let email = req.params.email;
    let data = await Controller.getAgent(email);
    res.write(JSON.stringify(data));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify(err));
  } finally {
    res.end();
  }
});

//delete agent
app.delete("/api/gethookedAgents/:email", async (req, res) => {
  try {
    let email = req.params.email;
    let data = await Controller.DeleteAgent(email);
    res.write(JSON.stringify(data));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify(err));
  } finally {
    res.end();
  }
});

//post agent sign up
app.post("/api/gethookedAgents", async (req, res) => {
  const data = await Controller.addAgent(req.body);
  res.write(JSON.stringify(data));
  res.end();
});

//update agent
// app.put("/api/gethookedAgents/:email", async (req, res) => {
//   let email = req.params.email;
//   let newData = req.body;
//   try {
//     let results = await Controller.updateAgent(email, newData);
//     print("testing for results", results);
//     res.write(JSON.stringify(results));
//   } catch (err) {
//     res.writeHead(400, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(err));
//   } finally {
//     res.end();
//   }
// });

app.patch("/api/gethookedAgents/update/:email", async(req, res)=>{
  let email = req.params.email 
  let {type, content} = req.body;
  try { 
   let results = await Controller.updateAgentAttribute(email, {type, content});
  res.write(JSON.stringify(results))
  } catch(err)
  {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify(err));
  } finally 
  {
    res.end();
  }
})


//update agent online status
app.patch("/api/gethookedAgents/status", async (req, res) => {
  let objdata = req.body;
  try {
    let results = await Controller.updateAgentStatus(objdata);
    res.write(JSON.stringify(results));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify(err));
  } finally {
    res.end();
  }
});

//add chat on message send


// User Posts

// create post

// delete post

// update post





//send Messages
app.post("/api/gethookedAgent/sendMessage", (req, res) => {
  let objMessage = req.body;
  res.writeHead(200, { "Content-Type": "application/json" });
  Controller.sendMessage(objMessage);
  res.write(JSON.stringify(objMessage));
  res.end();
});

server.listen(PORT, () => {
  print(`server starting on port ${PORT}`);
});
