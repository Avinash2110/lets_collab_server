import { DataTypes, Deferrable, Sequelize } from "sequelize";
import sequelize from "../configs/dbConfig.js";

const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: "id",
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    amount: {
        type: DataTypes.STRING,
        defaultValue: 0,
    },
    description: {
        type: DataTypes.STRING,
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model : User,
            key: id,
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
})

export default Expense;