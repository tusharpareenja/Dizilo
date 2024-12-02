'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PlusCircle, Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/ui/Navbar'
import CreatePostModal from '@/components/ui/CreatePostModal'
import CommentSection from '@/components/ui/CommentSection'

export default function Community() {
  const [posts, setPosts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Assuming the token is stored in localStorage
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/community/getpost', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies if needed
      })
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleCreatePost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:3000/api/community/createpost', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPosts([response.data, ...posts])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-Custom2">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Community</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mb-8 bg-purple-600 hover:bg-purple-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Create Post
        </Button>
        <div className="space-y-8">
          {posts.map((post) => (
            <Post key={post._id} post={post} />  
          ))}
        </div>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  )
}

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes?.length || 0)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setLikes(likes + 1)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
          {/* Check if authorId and authorId.name exist */}
          {post.authorId?.name?.[0] || "?"} {/* Default to "?" if not available */}
        </div>
        <span className="font-semibold">{post.authorId?.name || "Unknown Author"}</span>
      </div>
      <p className="mb-4">{post.description}</p>

      {/* Ensure mediaURL exists and is an array before rendering the image */}
      {post.mediaURL && Array.isArray(post.mediaURL) && post.mediaURL.length > 0 && (
        <img
          src={`http://localhost:3000/${post.mediaURL}`}
          alt="Post"
          className="w-full h-auto rounded-lg mb-4"
        />
      )}

      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={handleLike} className="text-purple-400 hover:text-purple-300">
          <Heart className="mr-2 h-5 w-5" /> {likes}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setShowComments(!showComments)}
          className="text-purple-400 hover:text-purple-300"
        >
          <MessageCircle className="mr-2 h-5 w-5" /> {post.comments?.length || 0}
        </Button>
      </div>

      {showComments && <CommentSection comments={post.comments} postId={post._id} />}
    </div>
  )
}

