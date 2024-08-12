"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Button } from '../../components/ui/moving-border';
import { HoverEffect } from '../../components/ui/card-hover-effect';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
}

interface Recipe {
  recipe: {
    label: string;
    image: string;
    url: string;
  };
}

const CookFairyPage = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [recipes, setRecipes] = useState<{
    title: string;
    image: string;
    link: string;
  }[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, "pantryItems");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PantryItem));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const fetchRecipesForBatch = async (batchIngredients: string) => {
    const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
    const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;
    const query = encodeURIComponent(batchIngredients);
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.hits || [];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };

  const handleGetRecipes = async () => {
    const ingredients = items.map(item => item.name).join(', ');
    const ingredientArray = ingredients.split(',').map(ingredient => ingredient.trim());
    const batchSize = 5;

    let allRecipes: { title: string; image: string; link: string }[] = [];

    for (let i = 0; i < ingredientArray.length; i += batchSize) {
      const batch = ingredientArray.slice(i, i + batchSize).join(',');
      const recipes = await fetchRecipesForBatch(batch);
      allRecipes = allRecipes.concat(
        recipes.map((hit: any) => ({
          title: hit.recipe.label,
          image: hit.recipe.image,
          link: hit.recipe.url,
        }))
      );
    }

    if (allRecipes.length > 0) {
      setRecipes(allRecipes);
    } else {
      setNotification('No recipes found.');
    }
  };

  const handleCardClick = (item: { title: string; image: string; link: string }) => {
    const recipe = {
      recipe: {
        label: item.title,
        image: item.image,
        url: item.link,
      }
    };
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className='min-h-screen py-12 bg-gray-900'>
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="pt-20 md:pt-20 text-xl md:text-4xl font-bold text-neutral-50">
          Use Cook Fairy AI: Get inspired! Discover recipes based on the ingredients you already have.
        </h1>
        <div className=' p-6 rounded-lg shadow-lg'>
          <Button
            onClick={handleGetRecipes}
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 p-2"
          >
            Get Recipes
          </Button>
          {notification && (
            <p className="text-yellow-500 mt-2">{notification}</p>
          )}
        </div>
      </div>
      <div className="mx-8 mt-10">
        <div className="max-w-9xl mx-auto px-8">
          <HoverEffect
            items={recipes}
            onCardClick={handleCardClick}
          />
        </div>
      </div>
      {selectedRecipe && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-10/12 max-w-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-1 text-white bg-red-600 p-2 rounded-sm"
            >
              X
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">{selectedRecipe.recipe.label}</h2>
            <img
              src={selectedRecipe.recipe.image}
              alt={selectedRecipe.recipe.label}
              className="w-50 h-60 object-cover rounded-lg mb-4"
            />
            <a
              href={selectedRecipe.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              See full recipe
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookFairyPage;
