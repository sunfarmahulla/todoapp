const mongoose = require('mongoose');
const { Schema } = mongoose;

const dailytaskSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    discription:{
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Todo  = mongoose.model('Todo', dailytaskSchema, 'dailytask');

module.exports = Todo;