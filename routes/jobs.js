import  express  from "express";
import { getJobs,createJobs,updateJobs, deleteJobs,likeJobs } from "../controllers/jobs_route.js";
import auth from '../middleware/auth.js';

const router=express.Router();

router.get('/', getJobs);
 router.post('/',auth,createJobs);
router.patch('/:id',auth,updateJobs);
router.delete('/:id',auth,deleteJobs);
router.patch('/:id/likeJobs',auth,likeJobs);

export default router;