import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    title: String,
    message: String,
    name:String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var jobDescription = mongoose.model('jobDescription', jobSchema);

export default jobDescription;