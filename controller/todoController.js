const express = require('express');
const Todo = require('../models/Todo');


module.exports = ({
    getAll: async function (req, res, next) {
        let todos = [];
        Todo.find({}, function (err, data) {
            if (err) {
                next(err);
            } else {
                
                res.json(data)
            }
        });
    },
    create: async function (req, res, next) {
        const { name, discription} = req.body;
        const newTask = new Todo({ name,discription });
        newTask.save(function (err, data) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Task added successfully", data: null });
            }
        });
    },

    getById: async function (req, res, next) {
        Todo.findById(req.params.todoID, function (err, data){
            if (err) {
                next(err);
            } else {
                res.json(data);
            }
        });
    },

    updateById:async function (req, res, next) {
        Todo.findByIdAndUpdate(req.params.todoID,{name:req.body.name, discription:req.body.discription}, function (err, data){
            if(err){
                next(err);
            }else{
                res.json({ status: "success", message: "Task updated", data:null});

            }
        });
    },

    deleteById:async function (req, res, next) {
        Todo.findByIdAndRemove(req.params.todoID, function (err, data){
            if(err){
                next(err);
            }else{
                res.json({ status: "success", message: "Task deleted", data});

            }
        });
    },
})