function Input({disable, title,ref, onChange, type = "text", placeholder = "" }) {
  return (
    <div className="flex flex-col  gap-2  w-full mb-7">
      <label className="text-base">{title}</label>
      <input
        type={type}
        disabled={disable}
        ref={ref}
        // value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-5 py-1 w-full"
      />
    </div>
  );
}

export default Input;
