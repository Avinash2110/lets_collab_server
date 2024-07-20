import CustomException from "../errors/CustomException.js";
import Group from "../models/group.model.js";


const createGroup = async (req, res) => {

    const {group_name} = req.body;

    try {
        if(!group_name){
            throw new CustomException("Group name can't be empty", 400);
        }
        const group = await Group.create({
            group_name,
            created_by: req.userId
        });
        const groupResponse = {
            id: group.id,
            name: group.group_name,
            created_by: group.created_by,
            created_at: group.createdAt,
            updated_at: group.updatedAt
        }

        res.status(201).json({
            status: "success",
            message: "Group created successfully",
            groupResponse
        });
        
    } catch (error) {
        res.status(error.statusCode).json({
            "status": "error",
            "message": error.message,
        });
    }
}

const loadMyGroups = async (req, res) => {

    try {
        const groups = await Group.findAll({
            where: {
                created_by: req.userId
            }
        });
        res.status(200).json({
            status: "success",
            groups
        })

    } catch (error) {
        res.status(error.statusCode).json({
            "status": "error",
            "message": error.message,
        });
    }
}

const deleteMyGroup = async (req, res) => {
    const groupId = req.params.id;
    console.log(groupId);
    if(!groupId){
        throw new CustomException("groupId is required in the parameter", 400);
    }
    let isAuthenticatedtoDelete = false;
    try{
        const groups = await Group.findAll({
            attributes: ['id'],
            where: {
                created_by: req.userId
            }
        })
        // for(let i=0;i<groups.length;i++){
        //     if(groups)
        // }
        console.log(groups);
        groups.forEach(group => {
            if(group.id == groupId){
                isAuthenticatedtoDelete = true;
            }
        })
        console.log(isAuthenticatedtoDelete);
        if(!isAuthenticatedtoDelete){
            throw new CustomException("User not authorized to delete this group", 401);
        }

        await Group.destroy({
            where: {
                id: groupId
            }
        })

        res.status(200).json({
            status: "success",
            message: "Group deleted successfully"
        })
        
    }
    catch(error){
        res.status(error.statusCode).json({
            "status": "error",
            "message": error.message,
        });
    }
    

}

export {createGroup, loadMyGroups, deleteMyGroup};