import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TopPosts = () => {
  const posts = [
    { id: 1, title: "Behind the Scenes", engagement: "9.1%", reach: "18.8k", clicks: "31.1k", progress: "80%", selected: true, color: "red" },
    { id: 2, title: "Summer", engagement: "4.2%", reach: "15.6k", clicks: "4.6k", progress: "20%", selected: false, color: "yellow" },
    { id: 3, title: "Workshops", engagement: "8.2%", reach: "19.6k", clicks: "4.3k", progress: "30%", selected: false, color: "yellow" },
    { id: 4, title: "Product Showcase", engagement: "7.2%", reach: "11.6k", clicks: "1.6k", progress: "0%", selected: true, color: "green" },
    { id: 5, title: "Customer success", engagement: "6.2%", reach: "10.6k", clicks: "1.9k", progress: "0%", selected: false, color: "green" },
    { id: 6, title: "Implementation", engagement: "5.2%", reach: "10.6k", clicks: "1.2k", progress: "80%", selected: true, color: "red" },
    { id: 7, title: "Product", engagement: "4.2%", reach: "11.9k", clicks: "9.1k", progress: "60%", selected: false, color: "red" },
    { id: 8, title: "Engagement", engagement: "6.2%", reach: "11.6k", clicks: "1.6k", progress: "50%", selected: true, color: "yellow" },
    { id: 9, title: "Conversion", engagement: "8.2%", reach: "9.6k", clicks: "13.6k", progress: "30%", selected: false, color: "yellow" },
    { id: 10, title: "Clicks", engagement: "5.2%", reach: "8.6k", clicks: "21.6k", progress: "60%", selected: false, color: "yellow" },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-bold mb-4">Top Performing Posts</h2>
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 text-left"><input type="checkbox" /></th>
            <th className="py-2 text-left">Post</th>
            <th className="py-2">Engagement</th>
            <th className="py-2">Reach</th>
            <th className="py-2">Clicks</th>
            <th className="py-2">Progress</th>
            <th className="py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-800">
              <td className="py-2"><input type="checkbox" checked={post.selected} readOnly /></td>
              <td className="py-2 flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 bg-${post.color}-500`}></span> 
                {post.title}
              </td>
              <td className="py-2 text-center">{post.engagement}</td>
              <td className="py-2 text-center">{post.reach}</td>
              <td className="py-2 text-center">{post.clicks}</td>
              <td className="py-2 text-center">
                <div className="relative w-20 h-2 bg-gray-700 rounded">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 rounded" style={{ width: post.progress }}></div>
                </div>
                <span className="text-sm ml-2">{post.progress}</span>
              </td>
              <td className="py-2 text-center flex justify-center space-x-2">
                <FaEdit className="text-blue-400 cursor-pointer" />
                <FaTrash className="text-red-400 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPosts;
