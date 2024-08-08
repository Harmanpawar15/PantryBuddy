"use client";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db } from '../../../firebase';
import { IoAdd, IoTrash, IoPencil } from "react-icons/io5";
import { Button } from '../../components/ui/moving-border';
import { format, differenceInDays, isValid } from 'date-fns';
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";

const words = `Pantry Inventory`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
}

const InventoryPage = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1, expirationDate: "" });
  const [editItem, setEditItem] = useState<PantryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, "pantryItems");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PantryItem));
      setItems(itemsList);

      itemsList.forEach(item => {
        const expirationDate = new Date(item.expirationDate);
        
        if (isValid(expirationDate)) {
          const daysToExpiration = differenceInDays(expirationDate, new Date());
          
          if (daysToExpiration <= 5 && daysToExpiration >= 0) {
            setNotification(`Item "${item.name}" is expiring in ${daysToExpiration} day(s)!`);
          }
        } else {
          console.warn(`Invalid expiration date for item: ${item.name}`);
        }
      });
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.expirationDate) {
      setError("Please enter the item name and expiration date.");
      return;
    }

    if (editItem) {
      const itemDoc = doc(db, "pantryItems", editItem.id);
      await updateDoc(itemDoc, newItem);
      setEditItem(null);
    } else {
      const itemsCollection = collection(db, "pantryItems");
      await addDoc(itemsCollection, newItem);
    }
    setNewItem({ name: "", quantity: 1, expirationDate: "" });
    setError(null);

    const itemsSnapshot = await getDocs(collection(db, "pantryItems"));
    const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PantryItem));
    setItems(itemsList);
  };

  const handleEditItem = (item: PantryItem) => {
    setNewItem({ name: item.name, quantity: item.quantity, expirationDate: item.expirationDate });
    setEditItem(item);
  };

  const handleDeleteItem = async (id: string) => {
    await deleteDoc(doc(db, "pantryItems", id));
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className='min-h-screen py-12 bg-gray-900'>
      <div className="p-4 relative z-10 w-full text-center">
        {/* Replace the heading with TextGenerateEffect */}
        <h1 className="pt-16 md:pt-20 text-7xl md:text-7xl font-bold text-neutral-50 mb-8">
          <TextGenerateEffect words="Let Your Pantry Buddy Manage your Inventory 👩🏻‍🍳📝" />
        </h1>
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 p-2 rounded-md mb-2 md:mb-0 md:mr-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
              className="bg-gray-700 text-white border border-gray-600 p-2 rounded-md mb-2 md:mb-0 md:mr-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newItem.expirationDate}
              onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 p-2 rounded-md mb-2 md:mb-0 md:mr-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleAddItem}
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              {editItem ? "Update Item" : "Add Item"}
            </Button>
          </div>
          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
          {notification && (
            <p className="text-yellow-500 mt-2">{notification}</p>
          )}
        </div>
      </div>
      <div className="mx-8 mt-10">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            {items.length > 0 ? (
              items.map(item => (
                <li key={item.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-md shadow-md">
                  <div className="flex flex-col">
                    <p className="text-lg text-white">{item.name}</p>
                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-400">
                      Expiration Date: {isValid(new Date(item.expirationDate)) 
                        ? format(new Date(item.expirationDate), 'PPP') 
                        : "Invalid date"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all"
                    >
                      <IoPencil className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
                    >
                      <IoTrash className="text-lg" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-400">No items found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
