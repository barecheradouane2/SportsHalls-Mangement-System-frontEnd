import { Trash2 } from 'lucide-react';


function ProductSaleItem({product,deleteSale}) {
    return (
        <div className=" flex gap-2 " key={product.id}>
             
              <img
        src={product.img}
        alt={product.name}
        className=" h-20 object-cover rounded-md"
      />

      <div>
        <p>{product.name}</p>
        <p>{product.qty}</p>
        <p>{product.price} DZD</p>

      </div>

      <div className="flex items-center justify-center">
            <Trash2   onClick={()=>deleteSale(product)}/>

      </div>

            

        </div>
    )
}

export default ProductSaleItem
