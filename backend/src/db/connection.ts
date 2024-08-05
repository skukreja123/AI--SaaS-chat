import { connect, disconnect } from "mongoose";

async function connecttodatabase()
{
    try{
        await connect(process.env.MONGODB_URL);
        console.log("database connect");
        
    }catch(error)
    {
        console.log(error);
        throw new Error("Cannot connect the mongodb")
    }
}

async function disconnectfunctiondatabase()
{
    try{
        await disconnect()   
    }
    catch(error)
    {
        console.log(error);
        throw new Error("could not disconnect the mongodb")
    }
}


export {connecttodatabase , disconnectfunctiondatabase}
