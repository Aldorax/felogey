"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Avatar,
  Image,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";

import { Logo } from "@/components/icons";
import LogInTabForm from "./forms/LogInTabForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/user";
import RegisterTabForm from "./forms/RegisterTabForm";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!user && accessToken) {
      // Fetch user data
      axios
        .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]); // Empty array to run the effect only once

  const logoutUser = async () => {
    toast({
      title: "Logging you out",
      description: "You have logged out successfully. Redirecting....",
    });
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };
  return (
    <NextUINavbar isBordered isBlurred={false}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Image
            alt="Image"
            src="/e-logo.png"
            radius="none"
            className="bg-transparent w-7 h-7"
            width={100}
            height={100}
            fetchPriority="high"
          />
          <p className="font-bold text-inherit">Enetworks</p>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium hover:underline underline-offset-2"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src={user?.profile_image}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem href="/dashboard" key="dashboard">
                  <Link color="foreground" href="/dashboard">
                    Dashboard
                  </Link>
                </DropdownItem>
                <DropdownItem href="/profile" key="profile">
                  <Link color="foreground" href="/profile">
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem href="/support" key="support">
                  <Link color="foreground" href="/support">
                    Support
                  </Link>
                </DropdownItem>
                <DropdownItem key="join-the-telegram" href="#">
                  <Link color="foreground" href="#">
                    Join our telegram
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <LogInTabForm />
          )}
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {user ? (
            <div>
              <Button color="danger" onClick={logoutUser}>
                Log Out
              </Button>
            </div>
          ) : (
            <RegisterTabForm />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {user ? (
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <Image
              width={200}
              height={100}
              alt="User profile image"
              src={user?.profile_image}
            />
            <Link
              color="foreground"
              href="/dashboard"
              size="lg"
              className="border-b border-default-400 mt-2 font-semibold"
            >
              Dashboard
            </Link>
            <Link
              color="foreground"
              href="/profile"
              size="lg"
              className="border-b border-default-400 mt-2 font-semibold"
            >
              Profile
            </Link>
            <Link
              color="warning"
              href="/support"
              size="lg"
              className="border-b border-default-400 mt-2 mb-6 font-semibold"
            >
              Support
            </Link>
            <Button
              isExternal
              as={Link}
              color="danger"
              className="text-light"
              variant="bordered"
              onClick={logoutUser}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <Link className="font-bold" color="foreground" href="#" size="lg">
              Home
            </Link>
            <Link className="font-bold" color="warning" href="#" size="lg">
              Support
            </Link>
            <LogInTabForm />
            <div className="w-full">
              <RegisterTabForm />
            </div>
          </div>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};
