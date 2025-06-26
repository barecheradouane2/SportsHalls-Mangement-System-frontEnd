import { ShoppingCart, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ProductItem({ product
    ,handledelete,
    setproductvalue
 }) {
  const handleEdit = () => {
    setproductvalue(product);
  };



  return (
    <div className="relative flex flex-col items-center bg-white shadow-md rounded-lg p-4">
      {/* Dropdown top-right */}
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={()=>handleEdit()}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>handledelete(product.id)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Product Image */}
      <img
        src={`https://localhost:7259/${product.photos[0].imageName}`}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* Product Details */}
      <div className="mt-3 text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">
          {product.baseQty} {product.unitName} = {product.newPrice} DZD
        </p>
      </div>

      {/* Add to Cart Button */}
      <Button className="mt-4 w-full">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}

export default ProductItem;
