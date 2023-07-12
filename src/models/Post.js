import { Schema, model, models } from "mongoose";


const postSchema = new Schema({
  _id: {
    type: String,
    required: true,   
  },
  FirstName: {
    type: String,
    required: true,
    
  },
  LastName: {
    type: String, 
    required: true,
    
  },
  Gender: {
    type: String,
    required: true,
    
  },
  Country: {
    type: String,
    required: true,
    
  },
  Age: {
    type: Number,
    required: true,
    
  },
  Date: {
    type: String,
    required: true,
    
  },  
});

const Post = models.Post || model("Post",postSchema)

export default Post;

