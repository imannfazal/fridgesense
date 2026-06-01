

import Image from "next/image";

export default function Home() {
  const tags = [
    { emoji: "🧄", label: "garlic", top: "20%", left: "53%", rotation: "-11deg" },
    { emoji: "🥚", label: "eggs", top: "22%", left: "70%", rotation: "5deg" },
    { emoji: "🍅", label: "tomato", top: "20%", left: "84%", rotation: "16deg" },
    { emoji: "🥦", label: "broccoli", top: "42%", left: "61%", rotation: "-9deg" },
    { emoji: "🍗", label: "chicken", top: "72%", left: "70%", rotation: "15deg" },
    { emoji: "🧅", label: "onion", top: "82%", left: "95%", rotation: "6deg" },
  ];

  return (
    <main
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: '#224033',
        backgroundImage: 'linear-gradient(90deg, rgba(34, 64, 51, 1) 0%, rgba(15, 11, 8, 1) 100%)'
      }}
    >

      {/* Nav */}
      <nav className="flex justify-between items-center px-20 py-8 relative z-10">
        <div className="hover:cursor-pointer text-[#A89880] hover:text-[#F5ECD7] text-[14px] tracking-[4px] leading-tight transition-colors">
          fridge <div className="ml-5 -mt-[6px]">sense</div>
        </div>
        <a href="#" className="text-[#A89880] text-sm hover:text-[#F5ECD7] transition-colors">
          sign in
        </a>
      </nav>

      {/* Food image — right side */}
      <div className="absolute right-0 h-full w-[60%]">
        <Image
          src="/hero-food.png"
          alt="hero food"
          fill
          className="object-cover object-left"
          style={{ mixBlendMode: "color-dodge" }}
        />

      </div>

      {/* Floating ingredient tags */}
      {tags.map((tag) => (
        <div
          key={tag.label}
          className="absolute z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#F5ECD7] text-xs"
          style={{
            top: tag.top,
            left: tag.left,
            transform: `rotate(${tag.rotation})`,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(1px)",
          }}
        >
          <span>{tag.emoji}</span>
          <span>{tag.label}</span>
        </div>
      ))}

      {/* Hero text */}
      <div className="flex flex-1 items-center px-20 relative z-10 -mt-20">
        <div className="">
          <div>
            <h1 className="text-[#F5ECD7] text-7xl font-normal leading-tight">
              what's in your fridge,
            </h1>
            <h1 className="text-[#E8821A] text-8xl italic font-medium leading-tight -mt-6 ml-[450px]">
              is enough.
            </h1>
          </div>
          <p className="text-[#A89880] text-lg mb-4">
            6 ingredients. Low-carb. Here's tonight.
          </p>
          <a
            href="/onboarding"
            className="self-start bg-[#E8821A] text-[#0F0B08] text-sm font-medium px-6 py-3 rounded-full hover:bg-[#d4741a] transition-colors"
          >
            open my fridge
          </a>
        </div>
      </div>
    </main>
  );
}