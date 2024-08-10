
import React from "react";
import Link from "next/link"
import { Spotlight } from "./ui/Spotlight"
import { Button } from "./ui/moving-border";

function HeroSection() {
  return (
    <div
    className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0"
    >
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
        <div className="p-4 relative z-10 w-full text-center" >
            <h1
            className="mt-20 md:mt-0 text-5xl md:text-7xl font-bold   text-neutral-50 "
            >Welcome To Pantry Buddy</h1>

             <p className="text-lg md:text-2xl text-neutral-50 mt-4">Your kitchen companion for smarter, more organized cooking.</p>
            <p
            className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto"
            >Keep track of your pantry items with ease. Whether you’re checking what’s in stock, adding new items, or updating quantities, PantryBuddy has got you covered.</p>
            <div className="mt-4">
                <Link href={"/inventory"}>
                    <Button
                    borderRadius="1.75rem"
                    className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    >
                    Track Inventory 
                    </Button>
                </Link>
            </div>
        </div>
        
        </div>
  )
}

export default HeroSection