import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios';

const categories = [
  "UI/UX Design",
  "3D Models",
  "Sound Effects",
  "Animation",
  "Textures",
  "Scripts",
  "Plugins",
  "Shaders",
  "Sound",
  "Graphics"
]

const softwareList = [
  "Unity",
  "Unreal Engine",
  "Blender",
  "Cinema 4D",
  "Maya",
  "ZBrush",
  "Substance Painter",
  "Houdini",
  "After Effects",
  "Premiere Pro",
  "Photoshop",
  "Illustrator",
  "Audition",
  "FL Studio",
]

export default function AssetUploadForm() {
  const [assetName, setAssetName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState({ type: 'free', value: '' })
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [supportedSoftware, setSupportedSoftware] = useState('')
  const [mainFile, setMainFile] = useState(null)
  const [images, setImages] = useState([])



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to hold the asset data
    const formData = new FormData();
    formData.append('title', assetName);
    formData.append('category', category);
    formData.append('price', price.type === 'custom' ? price.value : 'free');
    formData.append('description', description);
    formData.append('link', link);
    formData.append('supportedSoftware', supportedSoftware);
  
    // Append main file if it exists
    if (mainFile) {
      formData.append('mainFile', mainFile);
    }
  
    // Append all images to FormData
    images.forEach(image => {
      formData.append('images', image);
    });
  
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token'); 
  
      // Send POST request to upload asset
      const response = await axios.post('http://localhost:3000/api/asset/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // This tells axios to send the data as form-data
          'Authorization': `Bearer ${token}`,    // Set the Authorization header with the token
        },
        withCredentials: true,                    // Ensure cookies are included in the request
      });
  
      // Handle response
      if (response.status === 201) {
        alert('Asset Uploaded');
      }
    } catch (err) {
      console.error('Error uploading asset:', err);
      alert('There was an error uploading the asset.');
    }
  };
  

  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files)
    if (images.length + newImages.length <= 5) {
      setImages((prevImages) => [...prevImages, ...newImages])
    } else {
      alert('You can upload up to 5 images only.')
    }
  }

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  


  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-white">Upload Your Digital Asset</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="assetName" className="text-white">Asset Name</Label>
          <Input
            id="assetName"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="bg-gray-800 text-white border-gray-700"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="w-full bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Price</Label>
          <RadioGroup
            value={price.type}
            onValueChange={(newType) => setPrice({ type: newType, value: newType === 'free' ? '' : price.value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free" className="text-white">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="text-white">Custom Price</Label>
            </div>
          </RadioGroup>
          {price.type === 'custom' && (
            <Input
              type="number"
              value={price.value}
              onChange={(e) => setPrice({ type: 'custom', value: e.target.value })}
              placeholder="Enter price"
              className="mt-1 bg-gray-800 text-white border-gray-700"
              min="0"
              step="0.01"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-800 text-white border-gray-700"
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="link" className="text-white">Link (Optional)</Label>
          <Input
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-gray-800 text-white border-gray-700"
            type="url"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supportedSoftware" className="text-white">Supported Software</Label>
          <Select value={supportedSoftware} onValueChange={setSupportedSoftware}>
            <SelectTrigger id="supportedSoftware" className="w-full bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Select supported software" />
            </SelectTrigger>
            <SelectContent>
              {softwareList.map((software) => (
                <SelectItem key={software} value={software}>
                  {software}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mainFile" className="text-white">Main File</Label>
          <Input
            id="mainFile"
            type="file"
            onChange={(e) => setMainFile(e.target.files?.[0] || null)}
            className="bg-gray-800 text-white border-gray-700"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Images (Up to 5)</Label>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              id="image-upload"
              className="hidden"
              disabled={images.length >= 5}
            />
            <Button
              type="button"
              variant="outline"
              className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              disabled={images.length >= 5}
              onClick={() => document.getElementById('image-upload').click()}
            >
              Upload Images ({images.length}/5)
            </Button>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative bg-gray-800 p-4 rounded-lg"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-auto object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 transition-transform duration-200 ease-in-out hover:scale-110"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out"
          >
            Upload Asset
          </Button>
        </div>
      </form>
    </div>
  )
}

