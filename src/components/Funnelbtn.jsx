import { Funnel } from "lucide-react";
 import { FunnelX } from 'lucide-react';


function Funnelbtn({filterOpen, setFilterOpen}) {
  return (
    <button className="flex items-center gap-2 bg-[var(--funel-color)]
    
    hover:bg-[var(--funel-color-hover)] transition-all duration-200
    
    px-5 py-1 ">

      {
        filterOpen ? 
        <FunnelX className="text-white cursor-pointer" onClick={() => setFilterOpen(false)} /> :
        <Funnel className="text-white cursor-pointer" onClick={() => setFilterOpen(true)} 
        />

      }
      
     
      
    </button>
  );
}

export default Funnelbtn;
