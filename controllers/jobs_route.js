import  express  from "express";
import mongoose from "mongoose";
import jobDescription from "../models/jobinfo.js";

const router=express.Router();

export const getJobs= async(req,res)=>{
    try {
        const JobDescription = await jobDescription.find();
                
        res.status(200).json(JobDescription);
       // console.log("works");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createJobs=async(req,res)=>{
    const job = req.body;

    const newjob = new jobDescription({...job,creator:req.userId,createdAt:new Date().toISOString()});
    try {
        await newjob.save();

         res.status(201).json(newjob );
    } catch (error) {
         res.status(404).json({ message: error.message });
    }
};

export const updateJobs = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const updatedJob = { creator, title, message, tags, selectedFile, _id: id };

    await jobDescription.findByIdAndUpdate(id, updatedJob, { new: true });

    res.json(updatedJob);
}

export const deleteJobs = async (req, res) => {
    const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await jobDescription.findByIdAndRemove(id);
    
    res.json({ message: "Post deleted successfully." });
}

export const likeJobs = async (req, res) => {
    const { id } = req.params;
    if(!req.userId)return res.json({message:'unauthenticated'}) ;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const job = await jobDescription.findById(id);
   
    const index=job.likes.findIndex((id)=>id===String(req.userId));
    if(index===-1){
        job.likes.push(req.userId);
    }else{
         job.likes=job.likes.filter((id)=>id!==String(req.userId));
    }
    const upJob=await jobDescription.findByIdAndUpdate(id, job, { new: true });

    res.json(upJob);
}