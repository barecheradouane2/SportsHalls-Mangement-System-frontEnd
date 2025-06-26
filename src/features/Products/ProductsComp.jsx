
import ProductItem from "./ProductItem";

function ProductsComp({
data,
setSearch,
setPageNumber,
setproductvalue,
handledelete
}) {

    console.log("ProductsComp data", data);
    console.log("ProductsComp setSearch", setSearch);
    console.log("ProductsComp setPageNumber", setPageNumber);
    console.log("ProductsComp setproductvalue", setproductvalue);
    console.log("ProductsComp handledelete", handledelete);

    return (

    
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">

            {
                data.map((product) => (
                    
                    <ProductItem 
                        key={product._id} 
                        product={product} 
                        handledelete={handledelete}
                        setproductvalue={setproductvalue}
                      
                       
                    />

                ))
            }
            
            
        </div>
    )
}

export default ProductsComp
