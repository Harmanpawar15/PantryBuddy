'use client';

import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import Link from "next/link";
import { usePathname } from 'next/navigation'; // Use usePathname for Next.js App Router

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname(); // Get current pathname

  // Define pages where Navbar should not be displayed
  const noNavbarPages = ['/login', '/signup'];

  // Render Navbar only if the current page is not in noNavbarPages
  if (noNavbarPages.includes(pathname)) return null;

  return (
    <div className={cn(className, "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50")}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <Link href={"/inventory"}>
          <MenuItem setActive={setActive} active={active} item="Inventory" />
        </Link>
        <Link href={"/cookfairy"}>
          <MenuItem setActive={setActive} active={active} item="CookFairy🧚" />
        </Link>
        <Link href={"/savedrecepies"}>
          <MenuItem setActive={setActive} active={active} item="Saved Recipes" />
        </Link>
        <Link href={"/login"}>
          <MenuItem setActive={setActive} active={active} item="Login" />
        </Link>
        <Link href={"/signup"}>
          <MenuItem setActive={setActive} active={active} item="Signup" />
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
