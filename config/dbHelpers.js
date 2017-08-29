"use strict";

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/* Models */
const Inventory = require('../models/Inventory');

/* Config details */
const {dbs} = require('./config.json');
const {dbUser, dbPassword, dbHost, dbPort} = dbs.inventory;

/* Mongo connection string */ 
const mongodbUri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/inventory`

/* Connection */
mongoose.connect(mongodbUri, {
  useMongoClient: true
});

module.exports = {
  findOne(query) {
    query = convertToRegex(query);
    return new Promise( (resolve, reject) => {
      return Inventory.findOne(query, (err, items) => {
        if (err) reject(err);
        resolve(items);
      });
    });    
  },

  findById(query) {
    return new Promise( (resolve, reject) => {
      return Inventory.findOne(query, (err, items) => {
        if (err) reject(err);
        resolve(items);
      });
    });
  },

  findMultiple(query) {
    query = convertToRegex(query);
    return new Promise( (resolve, reject) => {
      return Inventory.find(query, (err, items) => {
        if (err) reject(err);
        resolve(items);
      });
    });
  },

  addOne(query) {
    return new Promise( (resolve, reject) => {
      let item = new Inventory(query);
      return item.save( (err, item) => {
        if (err) reject(err);
        resolve(item);
      });
    });
  },

  modifyOne(query) {
    return new Promise( (resolve, reject) => {
      Inventory.update({ _id: query.id }, { $set: query.query}, (err, res) => {
        if(err) reject (err);
        resolve(res);
      })
    });
  },

  deleteOne(query) {
    return new Promise( (resolve, reject) => {
      return this.findById(query).then( (item) => {
        return item.remove( (err, removed) => {
          if(err) reject(err);
          resolve(removed);
        });
      })
    });
  }

}

const convertToRegex = queryObj => {
  return Object.keys(queryObj)
    .reduce( (ac, val) => {
      // Push to accumulator object
      ac[val] = new RegExp(queryObj[val], 'i');
      // return accumulator object into the next loop
      return ac;
  }, {})
}

// const convertToRegex = queryObj => {
//   Object.keys(queryObj)
//     .reduce((ac, key) => {
//       ac[key] = typeof queryObj[key] !== 'object'
//       ?  new RegExp(queryObj[key], 'i')
//       : convertToRegex(queryObj[key])
//   return ac
//  }, {})
// }