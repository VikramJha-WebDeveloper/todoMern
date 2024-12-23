const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    item: {type: String, required: true},
    category: {type: String, required: true},
    quantity: {type: String, required: true},
    completedTask: {type: Boolean, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user (userId)
        ref: "User", // Reference the User model
        required: true
      }
})

const ItemModel = mongoose.model("items", itemsSchema);

module.exports = ItemModel;