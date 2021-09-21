const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: String,
    status: {
        type: String,
    },

});

//instance methods
todoSchema.methods = {
    findActive: function () {
        return mongoose.model("Todo").find({ status: "active" })
    },

    findActiveCallback: function (cb) {
        return mongoose.model("Todo").find({ status: "active" },cb)
    },
},

//static methods
todoSchema.statics={
    findBy:function(){
        return this.find({name:/ta/i});
    }
}


// Query helpers
todoSchema.query={
    byName:function(){
        return this.find({name:/ta/i});
    }
}

    module.exports = todoSchema;