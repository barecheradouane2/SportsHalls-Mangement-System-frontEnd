import { Link } from "react-router-dom";
import { navlinks } from "../lib/constants";
import { useState } from "react";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  return (
    <div
      className=" h-screen sticky top-0 left-0 p-10 flex flex-col gap-16 bg-main-100
     shadow-xl max-md:hidden
    "
    >
      <div className="flex items-center gap-4  py-2 px-4">
        <h2 className="text-xl font-bold text-black">BRadSport</h2>
      </div>

      <div className="flex flex-col gap-8">
        {navlinks.map((link) => (
          <Link
            to={link.url}
            key={link.lable}
            onClick={() => setActiveLink(link.lable)}
            className={`flex items-center gap-4 p-1 rounded-md transition-colors duration-200
    ${
      activeLink === link.lable
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-blue-500 hover:text-white"
    }`}
          >
            {link.Icon}
            <p>{link.lable}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
