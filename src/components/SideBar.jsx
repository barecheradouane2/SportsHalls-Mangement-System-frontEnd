import { Link } from "react-router-dom";
import { navlinks } from "../lib/constants";

const Sidebar = () => {
  return (
    <div className=" h-screen sticky top-0 left-0 p-10 flex flex-col gap-16 bg-main-100
     shadow-xl max-md:hidden
    "> 
      <h2 className="text-xl font-bold">RadStore</h2>
      <div className="flex flex-col gap-8">
        {navlinks.map(( link) => (

          <Link to={link.url} key={link.lable} className="flex items-center gap-4">
            {link.Icon}
            <p>{link.lable}</p>

          </Link>



        ))}
      </div>
    </div>
  );
};

export default Sidebar;