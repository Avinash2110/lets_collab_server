import { DataTypes, Deferrable } from "sequelize";
import sequelize from "../configs/dbConfig.js";

const GroupMember = sequelize.define('GroupMember', {
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: "id",
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    joined_at: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW
    }
},{
    timestamps: false
})

export default GroupMember;