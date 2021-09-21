const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todoSchema = require('../schema/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);
const checkLogin=require('../middlewares/checkLogin')

router.get('/',checkLogin, (req, res) => {
    Todo.find({ status: "active" }).select({
        _id: 0,
        __v: 0
    })
        .limit(2)
        .exec((err, data) => {
            if (err) {
                res.status(500).json({ error: "There was a ServerSide Error!" });
            } else {
                res.status(200).json({
                    result: data,
                    message: " successfully"
                });
            }
        })
})


//Get Active Todos
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({ data, });
});


//GET ACTIVE TODOS Callback
router.get('/active-callback',  (req, res) => {
    const todo = new Todo();
    const data =  todo.findActiveCallback((err,data)=>{
        res.status(200).json({ data, });
    } );
    
});



//static methods
router.get('/find', async (req, res) => {
   const data=await Todo.findBy();
   res.status(200).json({data,})
});


router.get('/:id', async (req, res) => {
    await Todo.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "There was a ServerSide Error!" });
        } else {
            res.status(200).json({
                result: data,
                message: " successfully"
            });
        }
    })
})



//Insert 
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({ error: "There was a ServerSide Error!" });
        } else {
            res.status(200).json({
                message: "Todo was insert successfully"
            });
        }
    });
})





router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({ error: "There was a ServerSide Error!" });
        } else {
            res.status(200).json({
                message: "Todo was insert successfully"
            });
        }
    });
})

router.get('/all', async (req, res) => {

})

router.put('/:id', async (req, res) => {
    await Todo.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: "Joy",
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({ error: "There was a ServerSide Error!" });
            } else {
                res.status(200).json({
                    message: "Todo was Update successfully"
                });
            }
        }
    );
})

router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ error: "There was a ServerSide Error!" });
        } else {
            res.status(200).json({

                message: "Todo Delate  successfully"
            });
        }
    })
})

module.exports = router;