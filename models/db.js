const mongoose = require('mongoose');
try{
    mongoose.connect('mongodb+srv://avenger:sur9815aj@cluster0-isr7a.mongodb.net/nodeauth?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true

    }).then(()=>{
        console.log('mongodb is connected');
    })
}catch(err){
    console.log(err);
}
