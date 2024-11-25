import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import image1 from '../../assets/Images/Image1.jpg';
import image2 from '../../assets/Images/Image2.jpg';
import image3 from '../../assets/Images/Image3.jpg';
import image4 from '../../assets/Images/Image4.jpg';

const assets = [
  {
    id: 1,
    title: 'ASIAN - Pagoda Village',
    category: 'Environments',
    price: 124.99,
    image: image1,
  },
  {
    id: 2,
    title: 'Housing estate scene - Arc',
    category: '3D Models',
    price: 99.99,
    image: image2,
  },
  {
    id: 3,
    title: 'Diner',
    category: 'Environments',
    price: 69.99,
    image: image3,
  },
  {
    id: 4,
    title: 'MS - Monster Mega Pack 6',
    category: 'Smart Assets',
    price: 129.99,
    image: image4,
  },
];

export default function Graphics() {
  return (
    <div className="bg-black text-white p-6 font-Custom2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-Custom2 flex items-center gap-2">
          GRAPHICS
          <ChevronRight className="w-6 h-6" />
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-zinc-800 border-none hover:bg-zinc-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-zinc-800 border-none hover:bg-zinc-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {assets.map((asset) => (
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
        {/* Add See More Button at the end */}
        <Link
          to="/product/Graphics"
          className="flex items-center justify-center relative aspect-[3/2] rounded-lg overflow-hidden bg-zinc-800 bg-opacity-50 cursor-pointer hover:bg-opacity-70 transition-opacity"
        >
          <Button className="text-white text-lg font-medium">See More</Button>
        </Link>
      </div>
    </div>
  );
}
