import React from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { setSidebarToggleStateAction } from "@/store/Services/Controls";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sidebarActiveState } = useAppSelector((state) => state.appcontrols);
  // handle sidebar toggle
  const handleSidebarToggle = () => {
    dispatch(
      setSidebarToggleStateAction({
        newValue: !sidebarActiveState,
      })
    );
  };
  return (
    <div className={`bg-primary w-full min-h-screen text-primary-foreground p-2 relative`}>
      {/* menu btn */}
      <span
        onClick={handleSidebarToggle}
        className="h-8 w-8 bg-primary absolute left-full top-4 flex flex-col justify-center items-center ml-1 rounded-sm text-primary-foreground sm:hidden cursor-pointer"
      >
        <RiMenu2Fill className="text-lg" />
      </span>
      <ul className="w-full bg-orange-500 overflow-hidden">
        <li className="py-2 px-4 hover:bg-gray-700">Home</li>
        <li className="py-2 px-4 hover:bg-gray-700">Profile</li>
        <li className="py-2 px-4 hover:bg-gray-700">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
