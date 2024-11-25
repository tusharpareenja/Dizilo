import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/ui/Navbar';

// Assuming these imports are correct in your project structure
import image from "../assets/Images/assets.jpg"
import image1 from "../assets/Images/asset1.jpg"
import image2 from "../assets/Images/asset2.jpg"
import image3 from "../assets/Images/asset3.jpg"
import image4 from "../assets/Images/asset4.jpg"

const thumbnail = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 }
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-black font-Custom2">
        <Navbar />
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="h-14 w-32 bg-slate-700">
            <img
              src={image}
              width={24}
              height={24}
              alt="Quixel logo"
              className="mr-2 w-12 h-12 rounded-full"
            />
            <p className='text-lg text-white'>Quixel</p>
          </Badge>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Images */}
          <div className="space-y-4 lg:w-2/3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src={image}
                alt="Old mine tunnel view"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-4">
                {thumbnail.map((i) => (
                  <button
                    key={i.id}
                    className="relative w-32 aspect-[4/3] flex-shrink-0 rounded-md overflow-hidden ring-2 ring-transparent hover:ring-primary focus:ring-primary focus:outline-none"
                  >
                    <img
                      src={i.image}
                      alt={`Thumbnail ${i.id}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Info */}
          <Card className="lg:w-1/3">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">Old Mine</h1>
                <div className="flex gap-2 text-sm">
                  <a href="#" className="text-blue-500 hover:underline">
                    Environments
                  </a>
                  <span>›</span>
                  <a href="#" className="text-blue-500 hover:underline">
                    Industrial
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" strokeWidth={0.5} />
                  <span className="text-muted-foreground">(16)</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Free</h2>
                <div className="flex gap-4">
                  <Button className="flex-1">Download</Button>
                  <Button variant="outline" className="flex-1">
                    Add to My Library
                  </Button>
                </div>
              </div>

              <Card className="bg-card/50">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold mb-2">
                    Get all Quixel Megascans for free!
                  </h3>
                  <Button variant="link" className="text-blue-500">
                    Claim now
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="font-semibold">Included formats</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary">fbx</Badge>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-4">Details</h2>
                <div className="h-32 bg-muted rounded-lg">
                  Publish Date: 24 September 2024
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <div className='text-white'>
          <h2 className='font-Custom text-3xl mb-4'>Description</h2>
          <p className='font-Custom'>
            Digging for treasure (or trouble).

            Journey deep into the earth's core with this immersive mine asset pack. Construct authentic and immersive mining environments teeming with valuable resources, including rugged tunnels, intricate mining equipment, and hidden treasures waiting to be discovered.

            The Old Mine pack contains: 

            61 Assets

            File Formats

            Multi-Format Support: 3D assets are available in FBX + JPG format types, ensuring seamless integration with any game engine or DCC tool, including: Unreal Engine, Unity, Godot, Blender, Maya, and 3DS Max.

            Scene file Compatible with Unreal Engine 5.4

            Textures and Materials

            Texture Resolutions: 1K, 2K, 4K, 8K

            Texture Formats: JPG

            Note: Assets in the scene file showcased here are artistic interpretations of what can be achieved with the pack's contents. 

            *Example scenes showcased may not utilize every asset from the pack.

            *Some 3D assets in the scenes may not use all available texture maps.

            *Rendered images may include background elements (e.g., sky features) for visualization only that are not included in the pack.

            Create high-quality 3D experiences and worlds with Quixel Megascans. Browse thousands of photorealistic assets and environments, including materials, 3D assets, plants, decals, and more available here on Fab.

            For any questions or support regarding Quixel content, please get in touch here.
          </p>
        </div>
      </div>
    </div>
  );
}

