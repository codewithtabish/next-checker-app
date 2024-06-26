"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useId, useState } from "react";
import { Button } from "../ui/button";
import { Carrot, Moon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { UserButton, useUser } from "@clerk/nextjs";
const menu = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 1,
    name: "About",
    path: "/about",
  },
  {
    id: 1,
    name: "Contact Us",
    path: "/contact",
  },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isLoaded: userloading, user } = useUser();

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex gap-6 items-center flex-row">
        <Link href={"/"}>
          <Image src={"/logo.svg"} height={70} width={70} alt="logo Image" />
        </Link>
        <ul className=" flex-row items-center gap-4 hidden md:flex">
          {menu.map((item, index) => {
            return (
              <Link href={item.path} key={index}>
                <li className="font-serif font-medium text-gray-600 dark:text-gray-300">
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-row gap-3 items-center">
        {theme == "dark" ? (
          <SunMoon
            size={30}
            className="cursor-pointer text-gray-300"
            onClick={changeTheme}
          />
        ) : (
          <Moon
            size={30}
            className="cursor-pointer text-gray-600"
            onClick={changeTheme}
          />
        )}
        {!userloading ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : user ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <Button className="dark:text-white">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
