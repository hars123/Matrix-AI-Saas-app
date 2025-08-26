import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  House,
  SquarePen,
  Image,
  Hash,
  Eraser,
  FileText,
  Users,
  Scissors,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-tittle", label: "Blog Title", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <>
      {/* Backdrop for mobile */}
      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
        ></div>
      )}

      <div
        className={`fixed lg:static top-0 left-0 h-full w-60 max-sm:w-3/4 bg-white border-r border-gray-200 flex flex-col justify-between items-center z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="my-7 w-full px-3">
          {/* User Avatar */}
          <img
            src={user?.imageUrl}
            alt="User avatar"
            className="w-16 h-16 rounded-full mx-auto"
          />
          <h1 className="mt-2 text-center font-medium">{user?.fullName}</h1>

          {/* Navigation Links */}
          <div className="mt-6 space-y-2">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/ai"}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-4 py-2 flex items-center gap-3 rounded-md text-sm font-medium transition 
                   ${
                     isActive
                       ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                       : "text-gray-600 hover:bg-gray-100"
                   }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="w-full px-3 pb-6">
          <button
            onClick={() => openUserProfile()}
            className="w-full py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Profile
          </button>
          <button
            onClick={() => signOut()}
            className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded mt-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
