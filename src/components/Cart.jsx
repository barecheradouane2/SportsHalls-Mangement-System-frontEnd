function Cart({Amount,title,children
}) {
    return (
        <div className="bg-white flex  justify-between  flex-1 shadow-md rounded-lg p-6  w-70">
            {/* <div className="flex justify-between items-center"> */}
                <div className="">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <p className="text-2xl font-bold text-gray-900">{Amount}</p>
                </div>
                <div className="text-blue-500 flex items-center  text-3xl">
                    {children}
                </div>
            {/* </div> */}
        </div>
    )
}

export default Cart
