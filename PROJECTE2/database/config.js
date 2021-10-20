const mongoose= require('mongoose');

/*
const dbConnection=async()=>{
    await mongoose.connect(process.env.MONGODB_CNN, {
        useNewParser: true,
        userUnifiedTipology: true,
        useCreateIndex: true,
        useFindAndModify
    });
}
*/
const dbConnection=async()=>{
    
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewParser: true,
            userUnifiedTipology: true,
            useCreateIndex: true,
            useFindAndModify
        });
        console.log("Base de dades online");
    }catch(error){
        console.log((error));
        throw new Error("Error al iniciar la base de dades");
    }
}
module.exports={
    dbConnection
}