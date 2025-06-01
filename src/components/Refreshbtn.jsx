import { RefreshCw } from 'lucide-react';

function Refreshbtn({onClick}) {
  return (
    <button className="bg-[var(--refrech-color)] px-5 py-1
    cursor-pointer
    hover:bg-[var(--refrech-color-hover)] transition-all duration-200
    "
    onClick={onClick}
    >
     <RefreshCw color="white" />
    </button>
  );
}

export default Refreshbtn;
