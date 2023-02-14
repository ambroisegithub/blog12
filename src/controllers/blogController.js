import BlogModel from "../models/blogModels"
import commentModel from "../models/commentModel"
import {UploadToCloud} from "../helpers/cloud.js"
export const getAllBlogs = async(req,res)=>{

    try{
        const blog = await BlogModel.find();
        return res.status(300).json({
            status:"Get Success",
            number:blog.length,
            blog
        }) ; 
    }catch(error){
        return res.status(500).json({
            status:"failed",
            error:error.message,
        })
    }
}

export const CreatePost = async(req,res)=>{
    try{
const result = await UploadToCloud(req.file,res);
const newPost = await BlogModel.create({
    title:req.body.title,
    description:req.body.description,
    image:result.secure_url,
});
return res.status(201).json({
  status: "posted Success",
  message: "blog created successfully",
  content: {
    newPost,
  },
});
    }catch(error){
return res.status(400).json({
    status:"failed To create Blogs",
    error:error.message,
});
    }
}

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UploadToCloud(req.file, res);

    const post = await BlogModel.findById(id);
    if (!post) {
      return res.status(200).json({
        status: "failed",
        message: "Invalid Id can not uploads blog",
      });
    }
    await BlogModel.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      image: result.secure_url,
    });

    return res.status(500).json({
      status: "success",
      message: "Post updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: "failed",
      error: error,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await BlogModel.findById(id);
    if (!post) {
      return res.status(200).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    return res.status(500).json({
      status: "success",
      post,
    });
  } catch (error) {
    return res.status(200).json({
      status: "failed",
      error: error,
    });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await BlogModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    return res.status(204).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const post = await BlogModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "The post not found",
      });
    }
    const comment = new commentModel({
      name: req.user.name,
      email: req.user.email,
      comment: req.body.comment,
    });
    post.comments.push(comment);
    await post.save();
    return res.status(201).json({
      status: "success",
      message: "comment created successfully",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      status: "success",
      error: error,
    });
  }
};


