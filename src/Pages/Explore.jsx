import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import image from "../assets/Images/assets.jpg";
import image1 from "../assets/Images/asset1.jpg";
import image2 from "../assets/Images/asset2.jpg";
import image3 from "../assets/Images/asset3.jpg";
import image4 from "../assets/Images/asset4.jpg";

import artwork1 from "../assets/Images/artwork1.jpg";
import artwork2 from "../assets/Images/artwork2.jpg";
import artwork3 from "../assets/Images/artwork3.jpg";
import artwork4 from "../assets/Images/artwork4.jpg";
import artwork5 from "../assets/Images/artwork5.jpg";
import artwork6 from "../assets/Images/artwork6.jpg";
import artwork7 from "../assets/Images/artwork7.jpg";
import artwork8 from "../assets/Images/artwork8.jpg";
import artwork9 from "../assets/Images/artwork9.jpg";
import artwork10 from "../assets/Images/arowork10.jpg";
import artwork11 from "../assets/Images/artowork11.jpg";
import artwork12 from "../assets/Images/artwork12.jpg";

const assets = [
    {
        id: 1,
        title: "ASIAN - Pagoda Village",
        category: "Environments",
        price: 124.99,
        image: image1
    },
    {
        id: 2,
        title: "Housing estate scene - Arc",
        category: "3D Models",
        price: 99.99,
        image: image2
    },
    {
        id: 3,
        title: "Diner",
        category: "Environments",
        price: 69.99,
        image: image3
    },
    {
        id: 4,
        title: "MS - Monster Mega Pack 6",
        category: "Smart Assets",
        price: 129.99,
        image: image4
    },
    {
        id: 5,
        title: "Stylized Egyptian Environment",
        category: "Environments",
        price: 39.99,
        image: image
    },
    {
        id: 6,
        title: "Stylized Egyptian Environment",
        category: "Environments",
        price: 39.99,
        image: image
    },
    {
        id: 7,
        title: "Stylized Egyptian Environment",
        category: "Environments",
        price: 39.99,
        image: image
    }
];

const artworks = [
    {
        id: 1,
        image: artwork1,
        creator: "Elena Martinez",
        title: "Nature's Harmony"
    },
    {
        id: 2,
        image: artwork2,
        creator: "James Chen",
        title: "Castle in the Sky"
    },
    {
        id: 3,
        image: artwork3,
        creator: "Sarah Williams",
        title: "Deep Space"
    },
    {
        id: 4,
        image: artwork4,
        creator: "Alex Kim",
        title: "Urban Dreams"
    },
    {
        id: 5,
        image: artwork5,
        creator: "Maria Garcia",
        title: "Digital Soul"
    },
    {
        id: 6,
        image: artwork6,
        creator: "David Park",
        title: "Future Vision"
    },
    {
        id: 7,
        image: artwork7,
        creator: "Lisa Johnson",
        title: "Abstract Reality"
    },
    {
        id: 8,
        image: artwork8,
        creator: "Lisa Johnson",
        title: "Abstract Reality"
    },
    {
        id: 9,
        image: artwork9,
        creator: "Lisa Johnson",
        title: "Abstract Reality"
    },
    {
        id: 10,
        image: artwork10,
        creator: "Lisa Johnson",
        title: "Abstract Reality"
    },
    {
        id: 11,
        image: artwork11,
        creator: "Lisa Johnson",
        title: "Abstract Reality"
    },
    {
        id: 12,
        image: artwork12,
        creator: "Lisa Johnson",
        title: "Abstract Reality"
    },
];

function Explore() {
    const [activeTab, setActiveTab] = useState("Community");

    const navItems = [
        {
            label: "Community",
            isActive: activeTab === "Community",
            onClick: () => setActiveTab("Community")
        },
        {
            label: "Trending",
            isActive: activeTab === "Trending",
            onClick: () => setActiveTab("Trending")
        },
        {
            label: "Latest",
            isActive: activeTab === "Latest",
            onClick: () => setActiveTab("Latest")
        }
    ];

    return (
        <>
            <div className="w-full min-h-screen bg-black">
                <Navbar />
                <div className="w-full h-auto flex flex-col text-white font-Custom2">
                    <p className="text-2xl m-2">Creators of the week</p>
                    <div className="flex overflow-x-auto gap-4 p-2 scrollbar-hide">
                        {assets.map((asset) => (
                            <div
                                key={asset.id}
                                className="min-w-[200px] max-w-[300px] flex flex-shrink-0 flex-col group cursor-pointer"
                            >
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
                </div>

                <div className="mb-10 mt-7">
                    <p className="font-Custom2 text-3xl text-white m-3 mb-4">ALL CREATORS</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2  ">
                    {artworks.map((artwork) => (
                        <div
                            key={artwork.id}
                            className="relative aspect-square rounded-md group overflow-hidden hover:cursor-pointer"
                        >
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-end p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                <div className="text-white">
                                    <p className="text-sm font-medium">{artwork.creator}</p>
                                    <p className="text-xs opacity-75">{artwork.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white">
                    <nav className="flex items-center bg-zinc-900/90 backdrop-blur-sm rounded-full border border-zinc-800 p-1">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    item.isActive
                                        ? "bg-black text-white"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Explore;
