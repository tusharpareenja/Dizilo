export default function NavigationMenu() {
    const topRowItems = [
      "2D Assets",
      "3D Models",
      "Animations",
      "Atlases",
      "Audio",
      "Brushes",
      "Decals",
      "Education & Tutorials",
      "Environments",
      "Game Systems",
      "Game Templates"
    ]
  
    const bottomRowItems = [
      "HDRI",
      "Material & Textures",
      "Smart Assets",
      "Tools & Plugins",
      "UI",
      "VFX"
    ]
  
    return (
      <nav className="bg-black p-4 space-y-2 ml-3 font-Custom">
        <div className="flex flex-wrap gap-2 justify-center">
          {topRowItems.map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {bottomRowItems.map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    )
  }
  
  