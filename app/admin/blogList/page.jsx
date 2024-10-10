'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  // Define the fetchBlogs function with useCallback to prevent redefinition
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error('Error fetching blogs');
    }
  }, []);

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId }
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      toast.error('Error deleting blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // Add fetchBlogs to dependency array

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-50 text-left uppercase bg-gray-50'>
            <tr className='bg-[#f95959]'>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Author name
              </th>
              <th scope='col' className='px-6 py-3'>
                Blog Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                authorImg={item.authorImg}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;















// 'use client'
// import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify';

// const page = () => {
//   const [blogs, setBlogs] = useState([]);
//   const fetchBlogs = async () => {
//     const response = await axios.get('/api/blog');
//     setBlogs(response.data.blogs);
//   }
//   const deleteBlog = async (mongoId) => {
//     const response = await axios.delete('/api/blog',{
//       params:{
//         id:mongoId 
//       }
//     })
//     toast.success(response.data.msg);
//     fetchBlogs();
//   }

//   useEffect(() => {
//     fetchBlogs()

//   },[])


//   return (
//     <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
//       <h1>All blogs</h1>
//       <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide' >
//         <table className='w-full text-sm text-gray-500'>
//           <thead className='text-sm text-gray-50 text-left uppercase bg-gray-50'>
//             <tr className='bg-[#f95959]'>
//               <th scope='col' className='hidden sm:block px-6 py-3'>
//                 Author name
//               </th>
//               <th scope='col' className='px-6 py-3'>
//                 Blog Title
//               </th>
//               <th scope='col' className='px-6 py-3'>
//                 Date
//               </th>
//               <th scope='col' className='px-6 py-3'>
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {blogs.map((item, index) => {
//               return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog} />
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
// export default page
