import express from 'express';
import userRoutes from './routes/users.routes.js'; 
import { sequelize } from './db.js';
import './models/Users.js'; 

const app= express();
const PORT = 3000;

try {
    app.listen(PORT);    
    // Genero paths
    app.use(express.json());
    // aca llega todo lo "ejecutado" desde usersRoutes
    app.use(userRoutes)

    app.use("/",(req,res)=>{
        res.send("Hola")
    })

    await sequelize.sync();

    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
} catch (error) {
    console.log(error);
}








