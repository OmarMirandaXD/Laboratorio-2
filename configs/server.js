"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import studentRoutes from "../src/student/student.routes.js"
import teacherRoutes from "../src/teacher/teacher.routes.js"
import classRoutes from "../src/classes/classes.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"

const middlewares = (app) => { 
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/v1/auth", authRoutes)
    app.use("/v1/student", studentRoutes)
    app.use("/v1/teacher", teacherRoutes)
    app.use("/v1/class", classRoutes)
}

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT, () => {
            console.log(`server running on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.log(`server init failed: ${err}`)
    }
}

