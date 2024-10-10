import mongoose from "mongoose";

export const ConnectDB =  async () => {
  await mongoose.connect('mongodb+srv://spydercomp2021:spyderT2021@cluster0.tuziy.mongodb.net/blog-app')
  console.log("DB Connected");
  
}