import React from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { setThemeStateAction } from "@/store/Services/Theme";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { ThemeOptions, themeTypesCustome } from "@/types/types";
import { IoMenu } from "react-icons/io5";
import {
  setFullScreenStateAction,
  setSidebarToggleStateAction,
} from "@/store/Services/Controls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { BsArrowsFullscreen } from "react-icons/bs";
import { PiSignOutDuotone } from "react-icons/pi";
import { RiFullscreenExitLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { MdManageAccounts } from "react-icons/md";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dropdownRef = React.useRef(null);
  const { theme } = useAppSelector((state) => state.themecontrols);
  const { sidebarActiveState, fullScreenRef } = useAppSelector(
    (state) => state.appcontrols
  );

  // for theme
  const handleTheme = (selectedTheme: themeTypesCustome) => {
    dispatch(
      setThemeStateAction({
        newValue: selectedTheme === "light" ? "dark" : "light",
      })
    );
  };

  // handle sidebar toggle
  const handleSidebarToggle = () => {
    dispatch(
      setSidebarToggleStateAction({
        newValue: !sidebarActiveState,
      })
    );
  };

  // const handleItemClick = (event) => {
  //   event.stopPropagation();
  // };

  return (
    <header className="h-full flex flex-row justify-between items-center px-4">
      {/* left side */}
      <div className="w-max h-max flex flex-row items-center justify-center gap-4 font-Merriweather">
        <div className="icon hidden sm:flex" onClick={handleSidebarToggle}>
          <IoMenu className="cursor-pointer font-bold hover:scale-[1.02] transition-all duration-150 text-xl" />
        </div>
        <p className="font-semibold text-balance hidden sm550:flex xs:text-xs sm:text-sm ml-7 sm:ml-0 ">
          TABAN AIR - Passenger Service System
        </p>
      </div>
      {/* right side */}
      <div className="flex flex-row justify-center items-center space-x-2">
        <DropdownMenu>
          <BsArrowsFullscreen
            onClick={() => {
              dispatch(setFullScreenStateAction({ newValue: true }));
            }}
            className={`${
              fullScreenRef ? `hidden` : `flex`
            } text-gray-500 text-sm cursor-pointer mr-2`}
          />
          <RiFullscreenExitLine
            onClick={() => {
              dispatch(setFullScreenStateAction({ newValue: false }));
            }}
            className={`${
              fullScreenRef ? `flex` : `hidden`
            } text-gray-500 text-sm cursor-pointer mr-2`}
          />
        </DropdownMenu>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="!bg-none !bg-transparent !shadow-none border-none outline-none focus:border-none focus:outline-none hover:bg-transparent ring-0"
            >
              <FiSearch className="h-[1.2rem] w-[1.2rem] transition-all" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" ref={dropdownRef}>
            <DropdownMenuItem
              onClick={handleItemClick}
              className="flex flex-row gap-2"
            >
              <Input
                type="search"
                placeholder="Type PNR"
                className="bg-primary text-primary-foreground"
              />
              <Button>
                <FiSearch className="transition-all" />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="!bg-none !bg-transparent !shadow-none border-none outline-none focus:border-none focus:outline-none hover:bg-transparent ring-0"
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleTheme(ThemeOptions.light)}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTheme(ThemeOptions.dark)}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTheme(ThemeOptions.system)}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="relative h-10 w-10 rounded-full text-primary bg-primary"
            >
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage
                  src={
                    // userDetails?.picture
                    //   ? userDetails?.picture
                    //   :
                    "https://github.com/shadcn.png"
                  }
                  alt="Avatar"
                />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Hamza Qureshi
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  hamza123@gmail.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="font-Figtree">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Manage Account
                <DropdownMenuShortcut>
                  <MdManageAccounts />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer font-Figtree"
              onClick={() => {}}
            >
              Log out
              <DropdownMenuShortcut>
                <PiSignOutDuotone />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
