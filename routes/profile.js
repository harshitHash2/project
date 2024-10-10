const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// const User = require("../models/User");
// const Search = require("../models/Search");
// const bcrypt = require("bcryptjs");
var fetchuser = require("../middleware/fetchuser");

// var MongoClient = require('mongodb').MongoClient;
const connectToMongoClient = require('../applicationDbClient');




router.get('/getprofile', fetchuser, async (req,res) => {
    try{
        const userid= req.user.id;
        const dba = await  connectToMongoClient();
        const collection = await dba.collection('users');
        var myquery = { username: 'harshit' };
        
        var result = await collection.findOne(myquery);
        console.log(result);
    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }
  })


  router.post(
    "/updateprofile",
    fetchuser,
    async (req, res) => {
      // Validation for the input Fields
      const userid= req.user.id;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        // Adding Salt & Hash function to password and Createing entry in DB
        const dba = await  connectToMongoClient();
        const collection = await dba.collection('users');
        

    // Update the newly inserted document by setting the _id into a new field
    await collection.updateOne(
      { _id: userid }, // Find the inserted document by _id
      { $set: { fullname: req.body.fullname, imageurl: req.body.imageurl } } // Set the _id in the new field
    );
        console.log(authtoken);
        res.json({ authtoken });
      } catch (e) {
        //Typererror
        res.status(500).send("SOme error Occured");
      }
    }
  );



router.get('/addfriend', fetchuser, async (req,res) => {
    try{
        const userid= req.user.id;
       
        const dba = await  connectToMongoClient();
        const collection = await dba.collection('friends');
        // console.log('polo');
    // Insert a new document
    const result = await collection.insertOne({
      FPerson: 'Sample Document',
      SPerson: 'Some value',
      IsActive: true
    });

    // Update the newly inserted document by setting the _id into a new field
    await collection.updateOne(
      { _id: result.insertedId }, // Find the inserted document by _id
      { $set: { MID: result.insertedId } } // Set the _id in the new field
    );

    await collection.insertOne({
        FPerson: 'Some value',
        SPerson: 'Sample Document',
        IsActive: true,
        MID: result.insertedId
      });

    // console.log('Document inserted and _id added to new field:', result.insertedId);
        
    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }
  })



  router.get('/removefriend', fetchuser, async (req,res) => {
    try{
        const userid= req.user.id;
        const dba = await  connectToMongoClient();
        const collection = await dba.collection('friends');
        var myquery = { MID: "Valley 345" };
        var newvalues = { $set: { IsActive: false } };
        
    // Update the newly inserted document by setting the _id into a new field
    await collection.update(myquery, newvalues, { multi: true }
    );
        
    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }
  })



  module.exports = router;