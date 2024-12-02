import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

export default function CreatePostModal({ isOpen, onClose, onCreatePost }) {
  const [description, setDescription] = useState(''); // Renamed to 'description' to match backend field
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // For handling the loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Set loading to true to show some UI feedback
    setLoading(true);
  
    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();
    formData.append('author', 'Current User'); // Replace with actual user data
    formData.append('description', description); // Use 'description' to match backend field
    if (image) {
      formData.append('images', image); // Changed to 'images' to match backend
    }
  
    try {
      // Replace the URL with your backend endpoint
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/community/post', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Authorization header with the Bearer token
          'Content-Type': 'multipart/form-data', // Ensure that the request is sent as form-data
        },
        withCredentials: true, // Include cookies if needed (for session or token)
      });
  
      // Handle the response
      console.log('Post created:', response.data);
      onCreatePost(response.data); // Optionally call the onCreatePost callback to update the state in the parent component
      setDescription(''); // Clear description after posting
      setImage(null); // Clear image after posting
      onClose(); // Close the modal after successful post creation
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      // Set loading back to false when the request is done
      setLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create Post</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={description} // Use 'description' here instead of 'content'
            onChange={(e) => setDescription(e.target.value)} // Update the description state
            placeholder="What's on your mind?"
            className="w-full bg-gray-700 text-white"
            rows={4}
          />
          <Input
            type="file" // Corrected type to 'file' for image uploads
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="bg-gray-700 text-white"
          />
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </form>
      </div>
    </div>
  );
}
