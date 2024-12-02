import React, { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CommentSection from './CommentSection'


export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setLikes(likes + 1)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
          {post.author[0]}
        </div>
        <span className="font-semibold">{post.author}</span>
      </div>
      <p className="mb-4">{post.content}</p>
      {post.image && (
        <img src={post.image} alt="Post" className="w-full h-auto rounded-lg mb-4" />
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
          <MessageCircle className="mr-2 h-5 w-5" /> {post.comments.length}
        </Button>
      </div>
      {showComments && <CommentSection comments={post.comments} postId={post.id} />}
    </div>
  )
}
