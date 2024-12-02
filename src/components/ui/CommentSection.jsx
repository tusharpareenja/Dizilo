import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CommentSection({ comments, postId }) {
  const [newComment, setNewComment] = useState('')

  const handleAddComment = (e) => {
    e.preventDefault()
    // Here you would typically make an API call to add the comment
    console.log('Adding comment:', newComment, 'to post:', postId)
    setNewComment('')
  }

  return (
    <div className="mt-4 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-700 rounded p-3">
          <span className="font-semibold mr-2">{comment.author}:</span>
          {comment.content}
        </div>
      ))}
      <form onSubmit={handleAddComment} className="flex space-x-2">
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow bg-gray-700 text-white"
        />
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Comment
        </Button>
      </form>
    </div>
  )
}
