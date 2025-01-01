require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// import models
const ItemModel = require("./models/itemsModel.js");
const UserModel = require("./models/userModel.js")

const port = process.env.PORT || 3000;
const database_url = process.env.DATABASE_URL;
const secret_key = process.env.SECRET_KEY;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const connectToDatabase = async () => {
  await mongoose.connect(database_url);
  console.log(`Connected successfully to the database`);
};
connectToDatabase();


// For registration of user
app.post("/registration", async(req, res)=>{
  const {name, email, password, confirmPassword} = req.body;
  try{
    const registeredUser = await UserModel.findOne({email});
    if(registeredUser){
      res.status(400).json({errMessage: "This email already exists"});
      return;
    }
    if(password === confirmPassword){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser =  new UserModel({name, email, password: hashedPassword});
      const savedUser = await newUser.save();
      if(savedUser){
        res.status(200).json({message: "your Registration Successfully completed"});
      }else{
        res.status(400).json({errMessage: `Registration faild. Please try again later`});
      }
    }else{
      res.status(400).json({errMessage: "password did not match"})
    }
    
  }catch(err){
    res.status(500).json({errMessage: "Internal server error. Please try again later."});
  }
});

app.post("/login", async(req, res)=>{
  const {email, password} = req.body;
  const foundUser = await UserModel.findOne({email});
  if(!foundUser){
    console.log("no user found")
  }
  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
  if(isPasswordMatch){
    const token = jwt.sign({user_id: foundUser._id}, secret_key, {expiresIn:"1h"});
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict"
    })
    res.status(200).json({message: "login success", userName: foundUser.name});
  }else{
    res.status(400).json({errMessage: "invalid credentials"})
  }
});

const JWTauthenticate = (req, res, next)=>{
  const token = req.cookies.token;
  if(token){
    jwt.verify(token, secret_key, (err, user)=>{
    
      if(err){
        console.log(err)
      }else{
        req.user = user;
        next();
      }
    })
  }
};

app.get("/showUserName", JWTauthenticate, async(req, res)=>{
  try{
    const foundUser = await UserModel.findById(req.user.user_id);
    res.status(200).json({userName: foundUser.name});
  }catch(err){
    console.log(err);
  }
})

app.get("/showItems", JWTauthenticate, async (req, res) => {
  try {
    const findItems = await ItemModel.find({userId: req.user.user_id});
    if (findItems) {
      res.json(findItems);
    }
  } catch (err) {
    console.log(err);
  }
});

// for adding data
app.post("/addItems", JWTauthenticate, async (req, res) => {
  const { item, category, quantity, completedTask } = req.body;
  console.log("body", req.body);
  console.log("modi", req.user); // Debugging req.user here
  
  try {
    if (!item) {
      return res.status(400).json({ errorMessage: "Please add item" });
    }
    if (!category) {
      return res.status(400).json({ errorMessage: "Please choose category" });
    }
    if (!quantity) {
      return res.status(400).json({ errorMessage: "Please enter quantity" });
    }
    if (item && category && quantity) {
      // Create the new item and associate it with the logged-in user
      const newItem = new ItemModel({
        item,
        category,
        quantity,
        completedTask,
        userId: req.user.user_id,  // Associate item with logged-in user
      });

      console.log("newItem", newItem);
      const savedItem = await newItem.save();
      res.status(200).json(savedItem);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Error while adding the item" });
  }
});


// for editing item
app.put("/editItems", async (req, res) => {
  const { _id, newItem, newQuantity } = req.body;
  try {
    if (!newItem) {
      res
        .status(400)
        .json({ errorMessage: "Please add item you want to change" });
    }
    if (!newQuantity) {
      res
        .status(400)
        .json({ errorMessage: "Please add quantity you want to change" });
    }
    if (newItem && newQuantity) {
      const editedEtem = await ItemModel.findByIdAndUpdate(_id, {
        $set: { item: newItem, quantity: newQuantity },
      });
      if (editedEtem) {
        res.json({ ...editedEtem, message: "Item Changed successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// for deleting data
app.delete("/deleteItems", async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  try {
    const deleteItem = await ItemModel.findByIdAndDelete({ _id });
    if(deleteItem){
      res.status(200).json({...deleteItem, message: "deleted successfully"});
    }else{
      res.status(400).json({errorMessage: "Error while deleting"})
    }
    
  } catch (err) {
    console.log(err);
  }
});

// for task completion
app.put("/taskCompletion", async(req, res)=>{
  const {_id, completedTask} = req.body;
  try{
    const completedTask = await ItemModel.findByIdAndUpdate(_id, {$set: {completedTask: true}}, {new: true});
    if(completedTask){
      res.status(200).json(completedTask);
    }

  }catch(err){
    console.log(err);
  }
})

// for deleting all items at once
app.delete("/deleteAllItems", async (req, res)=>{
  const {category} = req.body;
  const deletedAllItems = await ItemModel.deleteMany({category});
  if(deletedAllItems.deletedCount > 0){
    res.status(200).json({...deletedAllItems, message: `${deletedAllItems.deletedCount} items deleted successfully`})
  }else{
    res.status(404).json({errorMessage: `No items found in category ${category}`});
  }
});

app.post("/logout", async(req, res)=>{
  try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:"strict"
    });
    res.status(200).json({message: "loggedout successfully"})
  }catch(err){
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
