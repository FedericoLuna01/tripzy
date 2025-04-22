import {Router} from "express";
import { Users } from "../models/Users.js";


export const getAllUsers=async(req,res)=>{
    const users= await Users.findAll();
    res.json(users);
}

export const getUser= async(req,res)=>{
    const {id}=req.params
    const user= await Users.findByPk(id)
    if(!user){
        return res.status(404).json({
            message:"No se encuentra el usuario"
        })
    }
    res.json(user)
}

 export const postUser= async (req,res)=>{
    // req.body."aca pongo los datos que llegan del front: nombre,email,contraseña,etc , lo que esta en la bd ,se desestructura"
    const {name,email,password} = req.body
    const user= await Users.create({
        // se puede colocar solo 1 si tiene la misma "clave:valor"
        name:name,
        email: email,
        password:password
    })
    res.json(user);
}

// Creo una funcion ya que es mas complejo ,y al final la llamo en el route.put
export const updateUser=async (req,res)=>{
const {id}= req.params;
const {name,email,password}=req.body;

const user= await Users.findByPk(id)

if(!user){
    return res.status(404).json({
        message: "User not found"
    })
}

await Users.update({
    name,
    email,
    password
    },
        {
         where : {id}    
        });
        await Users.update({ name, email, password }, { where: { id } });
        const updatedUser = await Users.findByPk(id); 
        res.json(updatedUser);
};

export const deleteUser= async(req,res)=>{

    const {id}=req.params;
    const user= await Users.findByPk(id)
    if(!user){
        return res.status(404).json({
            message: "User not found for delete"
        })
    }
    await Users.destroy({
        where:{id}
    });
    res.json({ message: "Usuario eliminado correctamente" });
}
