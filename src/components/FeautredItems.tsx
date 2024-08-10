"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/moving-border";
import { BackgroundGradient } from "./ui/background-gradient";
import {
  FaWarehouse,
  FaUtensils,
  FaBookmark,
  FaCamera,
  FaSort,
} from "react-icons/fa";

function FeautredItems() {
  const arr = [
    {
      title: "Manage Pantry🧑‍🍳",
      description:
        "Quickly manage your pantry inventory by Add, Update, & Delete Items, with a simple and intuitive interface.",
      icon: <FaWarehouse />,
    },
    {
      title: " COOK-FAIRY🧚 ",
      description:
        "Get inspired! Discover recipes based on the ingredients you already have.",
      icon: <FaUtensils />,
    },

    {
      title: "Save Recipes 🔖",
      description:
        "Save recipes suggested by our AI feature for easy access later.",
      icon: <FaBookmark />,
    },

    {
      title: "Image Recognition 🖼 ",
      description:
        "Use your camera to add items directly to your pantry, and let our AI help classify them.",
      icon: <FaCamera />,
    },

    {
      title: "Smart Organization ☑ ☒ ",
      description:
        "Sort items by category, expiration date, or any custom labels you choose.",
      icon: <FaSort />,
    },
  ];

  return (
    <div className="py-12 bg-gray-900">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            {" "}
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            {" "}
            Learn with the best{" "}
          </p>
        </div>
      </div>

      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {arr.map((item, index) => (
            <div key={index} className="flex justify-center">
              <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                  <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {item.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                    {item.description}
                  </p>
                  <p className=" p-4 text-neutral-600 dark:text-neutral-400 flex-grow">
                    {item.icon}
                  </p>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
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
  );
}

export default FeautredItems;
