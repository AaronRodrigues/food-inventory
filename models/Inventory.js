"use strict";

const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// Create the inventory Schema
const inventorySchema = mongoose.Schema({
  name: String,
  location: String,
  num_of_items: Number,
  type: String,
  hidden: Boolean
});

inventorySchema.index({name: 1, location: 1}, {unique: true});

// Create a model
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;