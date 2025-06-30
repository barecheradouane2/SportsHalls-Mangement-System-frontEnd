import { ShoppingCart, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogDemo from "@/components/DialogDemo";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useProductSales } from "../../Context/ProductSalesContext"; // adjust path as needed

import { toast, ToastContainer } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ProductItem({ product, handledelete, setproductvalue }) {


  const handleEdit = () => {
    setproductvalue(product);
  };

    const {  toggleSale } = useProductSales();


  const addeditref = useRef(null);

  const {
    register,
     setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: product.name,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        Name: product.name,
        Quantity: product.baseQty,
        NewPrice: product.newPrice,
      });
    }
  }, [product]);

  const onSubmit = async (data) => {

    const productsale={
      id:product.id,
      qty:data.Quantity,
      img:`https://localhost:7259/${product.photos[0].imageName}`,
      price:data.NewPrice,
      name:data.Name,

    }
      

    toggleSale (productsale);

        toast.success("Success: " + "add successfully added to cart", {
      position: "top-right"});

    
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
            <DropdownMenuItem onClick={() => handleEdit()}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handledelete(product.id)}
              className="text-red-600"
            >
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

        <DialogDemo
          ref={addeditref}
          btnName="Add to cart "
          btnIcon="+"
          title={"Add to cart"}
          handleSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-3">
            <Label htmlFor="Name">Name</Label>

            <Input
              id="Name"
              name="Name"
              type={"text"}
              {...register("Name", { required: "Name is required" })}

              // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="Quantity">Quantity</Label>

            <Input
              id="Quantity"
              name="Quantity"
              type={"number"}
              {...register("Quantity", {
                required: "Quantity is required",

                onChange: (e) => {
                  console.log("New Quantity:", e.target.value);

                    setValue("NewPrice",  (e.target.value * product.newPrice) / product.baseQty );
                  // you can also call a state update or custom logic here
                },
              })}

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="NewPrice">Price</Label>

            <Input
              id="NewPrice"
              name="NewPrice"
              type={"number"}
              {...register("NewPrice", { required: "NewPrice is required" })}

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        </DialogDemo>
      </Button>

      <ToastContainer />
    </div>
  );
}

export default ProductItem;
