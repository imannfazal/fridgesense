"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Fridge() {
    const router = useRouter()
    const [input, setInput] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        setName(localStorage.getItem("fs_name") || "")
    }, [])

    const addIngredient = () => {
        const trimmed = input.trim()
        if (trimmed && !ingredients.includes(trimmed)) {
            setIngredients([...ingredients, trimmed])
        }
        setInput("")
    }

    const removeIngredient = (item) => {
        setIngredients(ingredients.filter((i) => i !== item))
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") addIngredient()
    }

    const handleFind = () => {
        localStorage.setItem("fs_ingredients", JSON.stringify(ingredients))
        router.push("/results")
    }

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
                <div className="tracking-[5px] font-extrabold hover:cursor-pointer text-[#A89880] hover:text-[#F5ECD7] text-[14px]  leading-tight transition-colors">
                    <a href="/">fridge <div className="tracking-[7px] -mt-[2px]">sense</div></a>
                </div>
                <a href="#" className="text-[#A89880] text-sm hover:text-[#F5ECD7] transition-colors">
                    sign in
                </a>
            </nav>

            {/* Food image right side */}
            <div className="absolute right-[-15rem] top-0 h-full w-[55%] overflow-hidden">
                    <Image
                      src="/fridge-food.png"
                      alt="fridge food"
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: "120% center",
                        mixBlendMode: "color-dodge",
                      }}
                    />
            
                  </div>

            {/* Content */}
            <div className="flex flex-1 items-center px-20 relative z-10">
                <div className="flex flex-col gap-6 max-w-2xl w-full">
                    <div>
                        <h1 className="text-[#A89880] text-6xl font-medium">
                            what's in your fridge?
                        </h1>
                        <p className="text-[#A89880] font-medium text-base italic my-10">
                            add ingredients one by one
                        </p>
                    </div>

                    <input
                        autoFocus
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="type an ingredient..."
                        className="bg-transparent border-b-[2px] border-[#ffffff] text-[#F5ECD7] text-xl pb-3 outline-none placeholder:text-[#A89880]/30 w-full"
                    />

                    {/* Ingredient tags */}
                    {ingredients.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {ingredients.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[#F5ECD7] text-sm"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                    }}
                                >
                                    <span>{item}</span>
                                    <button
                                        onClick={() => removeIngredient(item)}
                                        className="text-[#A89880] hover:cursor-pointer hover:text-[#F5ECD7] transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={handleFind}
                        className="self-start bg-[#E8821A] text-[#0a1a0f] text-md font-bold px-5 py-2 rounded-full hover:bg-[#d4741a] hover:cursor-pointer transition-colors mt-4"
                    >
                        find my recipes →
                    </button>
                </div>
            </div>
        </main>
    )
}