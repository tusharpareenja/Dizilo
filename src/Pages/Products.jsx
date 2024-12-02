import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate for React Router v6+
import Navbar from '@/components/ui/Navbar';
import axios from 'axios';

function Products() {
  const { category } = useParams(); // Get the category from the URL params
  const [assets, setAssets] = useState([]); // Store fetched assets
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigate

  // Fetch assets when the category changes
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state

        const token = localStorage.getItem('token'); // Fetch the token from localStorage
        const response = await axios.get(
          `http://localhost:3000/api/asset/category/${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
            },
            withCredentials: true, // Include cookies
          }
        );

        if (response.status === 200) {
          setAssets(response.data); // Update assets with fetched data
        } else {
          throw new Error(`Failed to fetch assets: ${response.statusText}`);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred while fetching assets.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchAssets();
  }, [category]); // Run this effect whenever the category changes

  // Handle asset click and navigate to ProductPage
  const handleAssetClick = (assetId) => {
    navigate(`/productpage/${assetId}`); // Navigate to the product detail page
  };

  return (
    <>
      <div className="w-full min-h-screen bg-black text-white flex flex-col overflow-y-auto">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{category}</h1>

          {loading ? (
            <p className="text-zinc-400">Loading assets...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : assets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.map((asset) => (
                <div key={asset._id} className="group cursor-pointer" onClick={() => handleAssetClick(asset._id)}>
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-3">
                    <img
                      src={`http://localhost:3000/${asset.images[0]}`}  // Access the first image in the array
                      alt={asset.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-1 truncate">{asset.title}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{asset.category}</p>
                  <p className="text-sm">
                    From <span className="text-white">${asset.price}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400">No assets found for this category.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
