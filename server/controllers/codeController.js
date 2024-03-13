import codeModel from "../models/codeModel.js";

export const saveCodeController = async (req, res) => {
    try {
        // const {owner,name,desc,content} = req.body
        const code = new codeModel({ ...req.body });
        await code.save();
        res.status(201).send({
            success: true,
            message: 'Code Saved Successfully',
            code
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in saving code'
        })
    }
}

export const fetchCodeController = async(req,res)=>{
    try {
        const {owner}  = req.params;
        const data = await codeModel.find({owner: owner});
        res.status(201).send({
            success:true,
            message: 'Codes Fetched Succesfully',
            data
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating code'
        })
    }
}

export const updateCodeController = async(req,res)=>{
    try {
        const {id} = req.params;
        const {content} = req.body;
        const newCode = await codeModel.findByIdAndUpdate(id,{content: content}, { new: true });
        res.status(201).send({
            success:true,
            message:'Code Updated Successfully',
            newCode
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in updating code',
            error
        })
    }
}

export const deleteCodeController = async(req,res)=>{
    try {
        await codeModel.findByIdAndDelete(req.params.id);
        console.log(req.params.id)
        res.status(200).send({
            success: true,
            message: 'Code deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error in deleting code',
        })
    }
}