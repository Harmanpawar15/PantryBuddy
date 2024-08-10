

'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import Link from "next/link";


function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 " , className)}
    >
        <Menu setActive={setActive}>
            <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home">
            
            </MenuItem>
            </Link>

            <Link href="/inventory">
            <MenuItem setActive={setActive} active={active} item="Inventory">
            
            </MenuItem>
            </Link>

            

            {/* <MenuItem
            setActive={setActive} active={active} item="Test"> */}
               {/* <div className="flex flex-col space-y-4 text-sm"> */}
            {/* <HoveredLink href="/Inventory">
              Add Item 
            </HoveredLink>
               </div> */}

               {/* <div className="flex flex-col space-y-8 text-sm">
            <HoveredLink href="/Inventory">
              Delete item
            </HoveredLink>
               </div> */}
            {/* </MenuItem> */}

            <Link href={"/cookfairy"}>
            <MenuItem setActive={setActive} active={active} item="CookFairy🧚">
            </MenuItem>
            </Link>

            <Link href={"/savedrecepies"}>
            <MenuItem setActive={setActive} active={active} item="Saved Receipes">
            </MenuItem>
            </Link>


            {/* <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us">
            </MenuItem>
            </Link> */}

            <Link href={"/pantry"}>
            <MenuItem setActive={setActive} active={active} item="Quick Add">
            
            </MenuItem>
            </Link>



        </Menu>
    </div>
  )
}

export default Navbar