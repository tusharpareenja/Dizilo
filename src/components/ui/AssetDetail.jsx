import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function AssetDetail() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Card className="max-w-xl mx-auto bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
              Q
            </div>
            <span className="font-medium">Quixel</span>
          </div>
          
          <h1 className="text-3xl font-bold">Old Mine</h1>
          
          <div className="flex gap-2 text-sm">
            <a href="#" className="text-blue-400 hover:underline">Environments</a>
            <span className="text-zinc-400">›</span>
            <a href="#" className="text-blue-400 hover:underline">Industrial</a>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 fill-opacity-50" />
            </div>
            <span className="">(16)</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600">Download</Button>
              <Button variant="outline" className="flex-1 border-zinc-700 hover:bg-zinc-800">
                Add to My Library
              </Button>
            </div>
          </div>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Get all Quixel Megascans for free!</h3>
              <a href="#" className="text-blue-400 hover:underline">
                Claim now
              </a>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h2 className="font-semibold">Included formats</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-zinc-700">
                <span className="w-5 h-5 rounded-full bg-zinc-700 mr-1.5" />
                U
              </Badge>
              <Badge variant="outline" className="border-zinc-700">fbx</Badge>
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Details</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

