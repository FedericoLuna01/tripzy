import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Users= sequelize.define("users",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name:{
        type: DataTypes.STRING,
        allowNull : false
    },
    email:{
        type: DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull : false
    }
    //TODO: AGREGAR ROLE Y ESTADO (activo o bloqueado)

},
// para sacar las fechas
// {
//     timestamps:false
// }
)