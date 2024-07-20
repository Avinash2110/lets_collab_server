import { DataTypes, Deferrable } from "sequelize";
import sequelize from "../configs/dbConfig.js";
import User from "./user.model.js";

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    group_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
})

export default Group;