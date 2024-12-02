import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the assetId from URL params
import axios from 'axios';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/ui/Navbar';
import image from '../assets/Images/assets.jpg';

export default function ProductPage() {
  const { assetId } = useParams(); // Get assetId from URL params
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch asset data from the API
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state

        const token = localStorage.getItem('token'); // Fetch token from localStorage
        const response = await axios.get(
          `http://localhost:3000/api/asset/find/${assetId}`, // Use assetId to fetch asset details
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Include cookies if needed
          }
        );

        if (response.status === 200) {
          setAsset(response.data); // Set the fetched asset data
        } else {
          throw new Error(`Failed to fetch asset: ${response.statusText}`);
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the asset.');
        console.error(err);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchAsset();
  }, [assetId]); // Re-run effect if assetId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-black font-Custom2">
  <Navbar />
  <div className="container mx-auto p-4 space-y-6">
    {/* Header */}
    <div className="flex items-center gap-4">
      <Badge variant="secondary" className="h-14 w-32 bg-slate-700">
        <img
          src={image} // Replace with the asset image if available
          width={24}
          height={24}
          alt="Asset logo"
          className="mr-2 w-12 h-12 rounded-full"
        />
        <p className="text-lg text-black">{asset?.name}</p> {/* Display asset name */}
      </Badge>
    </div>

    {/* Main content */}
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left column - Images and Thumbnail Gallery */}
      <div className="space-y-4 lg:w-2/3">
        {/* Main Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={`http://localhost:3000/${asset?.images[0]}`} // Display the image fetched from the API
            alt={asset?.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-3 gap-2">
          {asset?.images?.slice(1).map((image, index) => (
            <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-md ring-2 ring-transparent hover:ring-primary focus:ring-primary focus:outline-none">
              <img
                src={`http://localhost:3000/${image}`} // Display the other images as thumbnails
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right column - Info */}
      <Card className="lg:w-1/3">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{asset?.title}</h1>
            <div className="flex gap-2 text-sm">
              <a href="#" className="text-blue-500 hover:underline">
                {asset?.category}
              </a>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" strokeWidth={0.5} />
              <span className="text-muted-foreground">({asset?.ratings})</span> {/* Display rating */}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">{asset?.price}</h2> {/* Display price */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-black">Download</Button>
              <Button variant="outline" className="flex-1">
                Add to My Library
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold">Included formats</h2>
            <div className="flex gap-2">
              {asset?.formats?.map((format) => (
                <Badge key={format} variant="secondary">{format}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Details</h2>
            <div className="h-32 bg-muted rounded-lg">
            Publish Date: {new Date(asset?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Description */}
    <div className="text-white">
      <h2 className="font-Custom text-3xl mb-4">Description</h2>
      <p className="font-Custom">
        {asset?.description} {/* Display the description fetched from the API */}
      </p>
    </div>
  </div>
</div>

  );
}
