import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
import image1 from "../assets/Images/Image1.jpg"
import image2 from "../assets/Images/Image2.jpg"
import image3 from "../assets/Images/Image3.jpg"
import image4 from "../assets/Images/Image4.jpg"
import image5 from "../assets/Images/Image5.jpg"

const assets = [
    {
        id: 1,
        title: "ASIAN - Pagoda Village",
        category: "Graphics",
        price: 124.99,
        image: image1
      },
      {
        id: 2,
        title: "Housing estate scene - Arc",
        category: "Graphics",
        price: 99.99,
        image: image2
      },
      {
        id: 3,
        title: "Diner",
        category: "Graphics",
        price: 69.99,
        image: image3
      },
      {
        id: 4,
        title: "MS - Monster Mega Pack 6",
        category: "Graphics",
        price: 129.99,
        image: image4
      },
      {
        id: 5,
        title: "MS - Monster Mega Pack 6",
        category: "Smart Assets",
        price: 129.99,
        image: image5
      },
];

function Products() {
  const { category } = useParams();

  // Filter assets by category
  const filteredAssets = assets.filter(asset => asset.category === category);

  return (
    <>
      <div className="w-full min-h-screen bg-black text-white flex flex-col overflow-y-auto">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{category}</h1>
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssets.map(asset => (
                <div key={asset.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-3">
                    <img
                      src={asset.image}
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
