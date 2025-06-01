
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button"

import SideBar from "../components/SideBar";
import AdminHeader from "../components/AdminHeader";


function AppLayout() {
    return (
       <div className="flex">
      <SideBar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8 bg-gray-50 h-full w-full ">
    
          <Outlet />
        </main>
      </div>
    </div>
    
    )
}

export default AppLayout
