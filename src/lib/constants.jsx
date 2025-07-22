
import { LayoutDashboard,Shapes,ShoppingBag,Tag,UsersRound ,CircleUser,Settings ,Store,Users } from "lucide-react";

import { CalendarPlus } from 'lucide-react';
import { Folder } from 'lucide-react';
import { FolderInput } from 'lucide-react';
import { FolderOutput } from "lucide-react";
import { AppWindowMac } from 'lucide-react';

import { PackageSearch } from 'lucide-react';

// import { User } from 'lucide-react';








export const navlinks = [

    {
        url:"/",
        Icon:<LayoutDashboard  />,
        lable:"Dashboard"
    },

    {
        
         url:"/products",
        Icon:    <PackageSearch />,
        lable:"Products"

    }
   ,


    {

         url:"/activities",
        Icon:<AppWindowMac  />,
        lable:"Activities"

    }
    
    ,
    
    
    {

        url:"/members",
        Icon: <Users />,
        lable:"Members"
    },{

        url:"/subscriptions",
        Icon:<CalendarPlus  />,
        lable:"Subscriptions" 
    },{

        url:"/attendance",
        Icon:<Folder  />,
        lable:"Attendance"
    },
    {
        url:"/incomes",
        Icon: <FolderInput />,
        lable:"Incomes"

    }
    ,
    {

        url:"/outcomes",
        Icon:<FolderOutput  />,
        lable:"Outcomes"

    },{
        url:"/settings",
        Icon:<Settings  />,
        lable:"Settings"
    }



]