'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png"
  });

  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
      console.log(data);
  }

  const imageUrl = image ? URL.createObjectURL(image) : assets.upload_area;

  // useEffect(() => {
  //   return () => {
  //     if (image) URL.revokeObjectURL(imageUrl);
  //   };
  // }, [image]);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(URL.createObjectURL(image));
    };
  }, [image]);
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('author', data.author);
      formData.append('authorImg', data.authorImg);
      formData.append('image', image);

      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennett",
          authorImg: "/author_img.png"
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form');
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor="image">
          <Image className='mt-4' src={imageUrl} width={140} alt='' height={70} />
        </label>
        <input 
          onChange={(e) => setImage(e.target.files[0])} 
          type="file" 
          id='image' 
          hidden 
          aria-label="Upload Image" 
          required 
        />
        <p className='text-xl mt-4'>Blog title</p>
        <input 
          name='title' 
          onChange={onChangeHandler}  
          value={data.title} 
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
          type="text" 
          placeholder='Type here'  
          required 
        />

        <p className='text-xl mt-4'>Blog Description</p>
        <textarea 
          name='description' 
          onChange={onChangeHandler} 
          value={data.description} 
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
          placeholder='Write content here' 
          rows={6} 
          required 
        />

        <p className='text-xl mt-4'>Blog category</p>
        <select 
          name="category" 
          onChange={onChangeHandler} 
          value={data.category} 
          className='w-40 mt-4 px-4 py-3 border text-gray-500'
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </>
  )
}

export default Page;




// 'use client'
// import { assets } from '@/Assets/assets'
// import axios from 'axios'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'

// const page = () => {
//   const [image, setImage] = useState(false)
//   const [data, setData] = useState({
//     title:"",
//     description:"",
//     category:"",
//     author:"",
//     authorImg:"/author_img.png"
//   })
//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data=>({...data,[name]:value}))
//     console.log(data);
//   }

//   // Add submit btn code 
  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('title',data.title);
  //   formData.append('description',data.description);
  //   formData.append('category',data.category);
  //   formData.append('author',data.author);
  //   formData.append('authorImg',data.authorImg);
  //   formData.append('image',image);
  //   const response = await axios.post('/api/blog',formData);
  //   if (response.data.success) {
  //     toast.success(response.data.msg)
  //   }
  //   else{
  //     toast.error("Error");
  //   }
  // }

//   return (
//     <>
//       <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
//         <p className='text-xl'>Upload thumbnail</p>
//         <label htmlFor="image">
//           <Image className='mt-4' src={!image? assets.upload_area: URL.createObjectURL(image)} width={140} alt='' height={70} />
//         </label>
//         <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required />
//         <p className='text-xl mt-4 '>Blog title</p>
//         <input name='title' onChange={onChangeHandler}  value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here'  required/>

//         <p className='text-xl mt-4 '>Blog Description</p>
//         <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Write content here' rows={6} required/>

//         <p className='text-xl mt-4'>Blog category</p>
//         <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
//           <option value="Startup">Startup</option>
//           <option value="Technology">Technology</option>
//           <option value="Lifestyle">Lifestyle</option>
//         </select>
//         <br />
//         <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>

//       </form>
      
//     </>
//   )

// }

// export default page
