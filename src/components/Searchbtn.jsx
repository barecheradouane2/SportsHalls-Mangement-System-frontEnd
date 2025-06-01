function Searchbtn({ onClick }) {
  return <button className="bg-[var(--secondcolor)] cursor-pointer
  hover:bg-[var(--thirdcolor)]  transition-all duration-10 
  
  text-gray-50 px-15 py-1"
  onClick={onClick}
  >Search</button>;
}

export default Searchbtn;
