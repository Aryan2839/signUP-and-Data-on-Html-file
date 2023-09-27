import express from "express";
import mongoose from "mongoose";
import { newUser } from "./schema.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors  from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));

mongoose.connect("") // link your mongoDB url
.then(()=>{
    console.log("connected to DB");
})
.catch(()=>{
    console.log("Unable to connect");
})



app.post("/signup", async (req, res) => {
    const { username, email, password, confirmPassword, address } = req.body;

    if (!username || !email || !password || !confirmPassword || !address) {
        return res.send("Please provide all fields");
    }

    if (password !== confirmPassword) {
        return res.send("Password and confirm password do not match");
    }

    try {
        const user = await newUser.create(req.body);
        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.send("Error creating user");
    }
});


app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/all",async(req,res)=>{
  const a= await newUser.find()
  res.json(a)
})

 app.get("/getUsers", async (req, res) => {
    try {
        const users = await newUser.find({});

        res.json(users);
    } catch (error) {
        console.error(error);
        res.json({ error: "Internal Server Error" });
    }
});
app.get("/table", (req, res) => {
    res.sendFile(__dirname + "/public/table.html");
});


app.delete("/deleteUser/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await newUser.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.json({ message: "User deleted successfully" });
        } else {
            res.json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: "Internal Server Error" });
    }
});






app.listen(4000,()=>{
    console.log("on 4000");
})



