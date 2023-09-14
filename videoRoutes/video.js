const router=require('express').Router()
const {videoUpload}=require('../middleware/videoUpload');
const {addVideo,getAllvideos,deleteVideo}=require('../controllers/videoController');
const authMiddleware=require('../middleware/authMiddleware')


router.post('/upload',videoUpload.single('video'),authMiddleware.verifyToken,addVideo)

router.get('/videos',authMiddleware.verifyToken,getAllvideos)

router.delete('/videos/:id',authMiddleware.verifyToken,deleteVideo);
 
module.exports=router