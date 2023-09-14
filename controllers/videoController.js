require('dotenv').config();
const Video = require('../models/video');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Secret_Key = process.env.JWT_SECRET

module.exports.addVideo = async (req, res) => {
  try {
    const { title, description } = req.body;     
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, Secret_Key);  
    const user = await User.findById(decodedToken.userId);
    const videoPath = req.file.path;

    if (!user || !title || !description) {
      res.status(400).json({ Message: "Invalid credentials" });
    }

    const video = new Video({
      title,
      description,
      filename: req.file.filename,
      videoUrl: videoPath,
      user: user._id
    })
    // videoUrl: `http://localhost:3001/public/videos/${req.file.filename}`,

    await video.save();

    res.status(200).json({ Message: "Video Uploaded Successfully" });

  } catch (error) {
    res.status(500).json({ Message:error }) 
  }
}

module.exports.getAllvideos = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, Secret_Key);
    const Currentuser = await User.findById(decodedToken.userId)
    const videos = await Video.find({ user: Currentuser._id });

    res.status(200).json(videos);

  } catch (error) {
    res.status(500).json({ Message: error })
  }
}

module.exports.deleteVideo=async(req,res)=>{
  try {
    const {id}=req.params; 
    const matchedID=await Video.findByIdAndDelete({_id:id});
    
    // const video=await Video.findByIdAndDelete(id)
    

    res.status(200).json({Message:"Video deleted"});

  } catch (error) {
    res.status(500).json({ Message: error })
  }
}