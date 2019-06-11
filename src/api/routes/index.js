const express = require('express');
const router = express.Router();
const studentController = require('../controllers/');

// route to get all students
 router.get('/',studentController.getStudents);

// route to search
 router.get('/search',studentController.search);

 // route to create
 router.post('/create',studentController.addStudent);

module.exports = router;