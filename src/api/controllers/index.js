const { Client } = require('@elastic/elasticsearch');
const db = require('../../config/db/');
const Student = require('../models/student');

const client = new Client({ node: process.env.ES_URL });

// Get all students
exports.getStudents = async (req, res) => {
  try {
      const students = await Student.find();        
       return  res.json({
        students,
  });
       
  } catch (err) {
     return  res.status(500).send('Something broke!');
    
   
  }
};