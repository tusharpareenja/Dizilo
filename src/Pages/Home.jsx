import Carousel from '@/components/ui/Carousel'
import Free from '@/components/ui/Free'
import Graphics from '@/components/ui/Graphics'
import Navbar from '@/components/ui/Navbar'
import NavigationMenu from '@/components/ui/NavigationMenu'
import RecentReleases from '@/components/ui/RecentReleases'
import Sounds from '@/components/ui/Sounds'
import React from 'react'

const carouselItems = [
  {
    image: "./src/assets/Images/Dragon_Temple.jpg",
    text: "Beautiful landscapes await you"
  },
  {
    image: "./src/assets/Images/Carnival.jpg",
    text: "Explore the unknown"
  },
  {
    image: "./src/assets/Images/Skybox.jpg",
    text: "Adventure is out there"
  }
]

function Home() {
    return (
        <>
          <div className="w-full min-h-screen bg-black flex flex-col overflow-y-auto">
            <Navbar />
            <div>
              <p className="text-3xl ml-1 text-white font-Custom2  mt-4 mb-4">FEATURING</p>
            </div>
            <div className="flex-1">
              <Carousel items={carouselItems} />
            </div>
            <div className=" bg-black">
              <NavigationMenu />
            </div>
         
            <div>
              <RecentReleases />
            </div>
            <div>
              <Free/>
            </div>
            <div>
              <Graphics/>
            </div>
            <div>
              <Sounds/>
            </div>

            <div className="w-40 h-40 bg-white mx-auto mt-8">
              {/* Add content here */}
            </div>
          </div>
        </>
    )
}

export default Home
