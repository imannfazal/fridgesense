"use client"
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/navigation"

const GOALS = [
    { emoji: "🥩", label: "High Protein", value: "high-protein" },
    { emoji: "🌿", label: "Low Carb", value: "low-carb" },
    { emoji: "🥗", label: "Low Calorie", value: "low-calorie" },
    { emoji: "💧", label: "Low Fat", value: "low-fat" },
    { emoji: "🌱", label: "Vegetarian", value: "vegetarian" },
    { emoji: "🪴", label: "Vegan", value: "vegan" },
    { emoji: "🩺", label: "Diabetic Friendly", value: "diabetic" },
    { emoji: "🌾", label: "Gluten Free", value: "gluten-free" },
]

export default function Onboarding() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [name, setName] = useState("")
    const [goals, setGoals] = useState([])
    const [customGoal, setCustomGoal] = useState("")
    const [allergies, setAllergies] = useState("")

    const toggleGoal = (value) => {
        setGoals((prev) =>
            prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
        )
    }

    const handleContinue = () => {
        if (step < 3) setStep(step + 1)
        else {
            // save to localStorage and go to fridge page
            localStorage.setItem("fs_name", name)
            localStorage.setItem("fs_goals", JSON.stringify(goals))
            localStorage.setItem("fs_allergies", allergies)
            router.push("/fridge")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleContinue()
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

            {/* Step 1 — Name */}
            {step === 1 && (
                <div className="mt-40 px-20 gap-8">
                    <div className="flex  justify-center">
                        <input
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="first, what should we call you?"
                            className="bg-transparent border-b border-[#ffffff] text-[#F5ECD7] text-[50px] outline-none placeholder:text-center placeholder:text-[50px] placeholder:text-[#A89880]/40 w-[680px]"
                        />
                    </div>
                    <div className="flex justify-center">
                        <p
                            onClick={name.trim() ? handleContinue : undefined}
                            className={`text-md self-center mt-[80px] transition-colors ${name.trim()
                                    ? "cursor-pointer text-[#A89880] hover:text-[#A89880]"
                                    : "cursor-not-allowed text-[#A89880]/60"
                                }`}
                        >
                            continue →
                        </p>
                    </div>
                </div>
            )}

            {/* Step 2 — Goals */}
            {step === 2 && (
                <div className="flex flex-1 flex-col justify-center px-20 gap-10">
                    <h1 className="text-[#A89880] text-6xl font-normal justify-center flex">
                        what are your health goals?
                    </h1>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-4 gap-8 max-w-4xl">
                            {GOALS.map((goal) => (
                                <button
                                    key={goal.value}
                                    onClick={() => toggleGoal(goal.value)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-full border-[2px] text-md transition-all ${goals.includes(goal.value)
                                        ? "bg-[#E8821A] border-[#A89880] text-[#0a1a0f]"
                                        : "border-[#A89880]/30 text-[#A89880] hover:border-[#A89880] hover:cursor-pointer"
                                        }`}
                                >
                                    <span>{goal.emoji}</span>
                                    <span>{goal.label}</span>
                                </button>
                            ))}
                        </div>

                    </div>
                    <div className="mx-[250px]">
                        <input
                            type="text"
                            value={customGoal}
                            onChange={(e) => setCustomGoal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="something else?"
                            className="bg-transparent border-b-[2px] border-[#A89880] text-[#F5ECD7] text-lg pb-2 outline-none placeholder:text-[#A89880]/30 w-48"
                        />
                    </div>
                    <p
                        onClick={handleContinue}
                        className="text-[#A89880]/60 text-md cursor-pointer hover:text-[#A89880] transition-colors self-center"
                    >
                        continue →
                    </p>
                </div>
            )}

            {/* Step 3 — Allergies */}
            {step === 3 && (
                <div className="flex flex-1 flex-col justify-center px-20 gap-8">
                    <h1 className="text-[#A89880] mb-20 text-6xl font-normal text-center">
                        anything you can't eat?
                    </h1>
                    <input
                        autoFocus
                        type="text"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="nuts, dairy, shellfish,..."
                        className="bg-transparent mb-12 border-b-[2px] border-[#ffffff] text-[#F5ECD7] text-2xl pb-3 outline-none placeholder:text-[#A89880]/30 w-full max-w-3xl self-center"
                    />
                    <p
                        onClick={handleContinue}
                        className="text-[#A89880]/60 text-md cursor-pointer hover:text-[#A89880] transition-colors self-center mt-8"
                    >
                        continue →
                    </p>
                    <div className="absolute right-[-30rem] top-0 h-full w-[80%] overflow-hidden">
                        <Image
                            src="/allergies.png"
                            alt="hero food"
                            fill
                            className="object-cover"
                            style={{
                                objectPosition: "120% center",
                                mixBlendMode: "color-dodge",
                            }}
                        />

                    </div>
                </div>

            )}
        </main>
    )
}