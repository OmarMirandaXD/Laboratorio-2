'use strict'

import mongoose from "mongoose"

export const dbConnection = async () => {
    try{
        mongoose.connection.on("error", () =>{
            console.log("could not be connect to MongoDB")
            mongoose.disconnect()
        })
        mongoose.connection.on("connecting", () => {
            console.log ("Try to connect to Server")
        })
        mongoose.connection.on("connected",() =>{
            console.log("Connected to the Server")
        })
        mongoose.connection.on("open",()=>{
            console.log("You alredy connected to the Database")
        })
        mongoose.connection.on("reconected",() =>{
            console.log("Recibed to the Server")
        })
        mongoose.connection.on("disconnected", ()=>{
            console.log("You disconnected to the Server")
        })

        await mongoose.connect(process.env.URI_MONGO,{
            serverSelectionTimeoutMS: 5000,
            maxPoolSize:50
        })
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}