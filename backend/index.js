const express = require("express");
const app = express();
const PORT = process.env.PORT || 5555;


const mongoDB = require("./db");

mongoDB()

app.use((req,res,next)=>{ 
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(express.json());
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require('./Routes/DisplayData'));
// -------db---------



app.get("/", (req, res) => {
  res.send("lmao");
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
