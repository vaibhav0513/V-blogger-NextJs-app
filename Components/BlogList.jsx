"use client";

import React, { useEffect, useState } from 'react';
import { blog_data } from '@/Assets/assets'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
    
  }

  useEffect(() => {
    fetchBlogs();
  },[])

  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
        <button onClick={()=> setMenu('All')} className={menu === "All" ? 'bg-[#f95959] text-white py-2 px-4 rounded-full' : ""}>All</button>
        <button onClick={()=> setMenu('Technology')} className={menu === "Technology" ? 'bg-[#f95959] text-white py-2 px-4 rounded-full' : ""}>Technology</button>
        <button onClick={()=> setMenu('Startup')} className={menu === "Startup" ? 'bg-[#f95959] text-white py-2 px-4 rounded-full' : ""}>Startup</button>
        <button onClick={()=> setMenu('Lifestyle')} className={menu === "Lifestyle" ? 'bg-[#f95959] text-white py-2 px-4 rounded-full' : ""}>Lifestyle</button>
      </div>
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {
          blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
            return <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category}/>
          })
        }

      </div>
    </div>
  )
}

export default BlogList
