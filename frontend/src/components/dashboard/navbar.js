"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/dashboard/products" },
  { label: "Categories", path: "/dashboard/categories" },
  { label: "Orders", path: "/dashboard/orders" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/auth/login");
  };

  return (
    <header className="flex items-start justify-end container py-4">
      <nav className="flex items-center gap-8 text-sm">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={cn(
              "opacity-80 hover:opacity-100",
              pathname === item.path && "opacity-100",
            )}
          >
            {item.label}
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-xs">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Navbar;
