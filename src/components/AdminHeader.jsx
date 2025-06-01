import { Link } from "react-router-dom";
import { navlinks } from "../lib/constants";

import { AlignJustify } from "lucide-react";

import { Bell } from "lucide-react";

import { useState } from "react";

function AdminHeader() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex  relative   justify-between items-center p-4 shadow-lg bg-white">
      
      <div>
      <h5 className="text-base font-semibold text-small-100">Welcome</h5>
        <h2 className="text-2xl font-bold"> Mr <span className="text-2xl font-bold   text-third-100">Radouane Dev</span></h2>
      </div>

      <div className=" flex justify-end items-center ">
        <div className="flex  flex-1 items-center justify-center gap-6  max-sm:hidden md:hidden">
          {navlinks.map((link) => (
            <Link
              to={link.url}
              key={link.lable}
              className="flex items-center gap-4"
            >
              <p>{link.lable}</p>
            </Link>
          ))}
        </div>

        <div className=" cursor-pointer">
          {" "}
          <Bell />
        </div>

        <div className="sm:hidden mx-4 cursor-pointer  ">
          <AlignJustify onClick={() => setShowMenu(!showMenu)} />

          {showMenu && (
            <div className=" flex flex-col items-center gap-10 w-screen h-screen  absolute top-18 right-0 bg-gray-200 shadow-xl p-4">
              {navlinks.map((link) => (
                <Link
                  to={link.url}
                  key={link.lable}
                  className="flex  items-start items-center gap-8"
                >
                  {link.Icon}
                  <p>{link.lable}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <span className="w-0.5  mx-4  h-10 bg-black">.</span>
        <img
          className=" cursor-pointer inline-block size-8 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default AdminHeader;