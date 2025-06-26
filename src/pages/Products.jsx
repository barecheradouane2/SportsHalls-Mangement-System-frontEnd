import PageTitle from "@/components/PageTitle";
import DialogDemo from "@/components/DialogDemo";
import TabsContent from "@/components/TabsContent";
import CurrentSubscriptions from "@/features/Subscriptions/CurrentSubscriptions";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { House } from "lucide-react";

import { CircleSlash } from "lucide-react";
import { CircleAlert } from "lucide-react";

import ProductsComp from "@/features/Products/ProductsComp";

function Products() {
  const [data, setData] = useState([]);

 
 // Default to the first activity's name or an empty string

   const [existingPhoto, setExistingPhoto] = useState(null);
  
 
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [isedit, setisedit] = useState(false);
  const addeditref = useRef(null);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Products/get-all-products?Search=${search}&PageNumber=${pageNumber}`
      );

      setData(response.data.data);

      console.log("data", data);
    } catch (error) {
      console.error(
        "Error fetching members:",
        error.response?.data || error.message
      );
    }
  };

  const setproductvalue = (product) => {
    setisedit(true);
    // addeditref.current.openModal();

    addeditref.current.click();
    setExistingPhoto(product.photos[0].imageName); // Store the existing photo for updates
    setValue("id", product.id);
    setValue("Name", product.name);
    setValue("Note", product.note);
    setValue("StockQty", product.stockQty);
    setValue("unit", product.unit  == 0 ? "Piece" : "g");
    setValue("BaseQty", product.baseQty);
    setValue("NewPrice", product.newPrice);
    setValue("OldPrice", product.oldPrice);
  }
  const handledelete  = async (id) => {
    try {
        const response = await axios.delete(
            `https://localhost:7259/api/Products/delete-product/${id}`
        );
        toast.success("Success: " + response.data.message);
        await getProducts(); // Refresh the list
        }
        catch (error) { 
        toast.error("Error: " + (error.response?.data || error.message));
        }
    }   

  

  const {
    register,
    setValue,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
     try {
          alert("products  with data: " + JSON.stringify(data));
    
          const formData = new FormData();
          formData.append("Name", data.Name);
          formData.append("Note", data.Note);
          formData.append("StockQty", data.StockQty);
          formData.append("unit", data.unit);
          formData.append("BaseQty", data.BaseQty);
          formData.append("NewPrice", data.NewPrice);
          formData.append("OldPrice", data.OldPrice);
        
    
          if (data.photos && data.photos[0]) {
           
            formData.append("Photos", data.photos[0]); // Append the file
          }
    
          let response = "";
    
          if (data.id === "0" || data.id === 0) {
            response = await axios.post(
              "https://localhost:7259/api/Products/create-product",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            formData.append("Id", data.id);
    
            formData.append("Photos", data.photos[0] || existingPhoto);
    
           
    
            response = await axios.put(
              "https://localhost:7259/api/Products/update-product",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
    
          toast.success("Success: " + response.data.message);
          await  getProducts() // Refresh the list
        } catch (error) {
          toast.error("Error: " + (error.response?.data || error.message));
        }
  };

  useEffect(() => {
    getProducts();
  }, [ pageNumber, search]);

  return (
    <>
      <PageTitle title="Products ">
        <DialogDemo
          ref={addeditref}
          btnName="Adding"
          btnIcon="+"
          setisedit={setisedit}
          title={isedit ? "Edit Product" : "Add Product"}
          handleSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-3 hidden">
            <Label htmlFor="id">id</Label>
            <Input
              id="id"
              name="id"
              type={"number"}
              {...register("id", { required: "id is required" })}
              defaultValue={0}
              // Set default to today
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

           <div className="grid gap-3">
            <Label htmlFor="Name">Name</Label>

            <Input
              id="Name"
              name="Name"
              type={"text"}
              {...register("Name", { required: "Name is required" })}

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="OldPrice">OldPrice</Label>

            <Input
              id="OldPrice"
              name="OldPrice"
              type={"number"}
              {...register("OldPrice", { required: "OldPrice is required" })}

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="NewPrice">NewPrice</Label>

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

          <div className="grid gap-3">
            <Label htmlFor="BaseQty">BaseQty</Label>

            <Input
              id="BaseQty"
              name="BaseQty"
              type={"number"}
              {...register("BaseQty", { required: "BaseQty is required" })}

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="unit">unit Name</Label>

            <select
              id="unit"
              {...register("unit", { required: "unit Name  is required" })}
              className="border p-2 rounded w-full"
            >
              <option value=""> unit Name</option>

              <option value="0">Piece</option>
              <option value="1">g</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="StockQty">StockQty</Label>

            <Input
              id="StockQty"
              name="StockQty"
              type={"number"}
              {...register("StockQty", { required: "StockQty is required" })}

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="Note">Note</Label>

            <Input
              id="Note"
              name="Note"
              type={"text"}
              {...register("Note", { required: "Note is required" })}

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="photos">photos</Label>

            <Input
              id="photos"
              name="photos"
              type="file"
              {...register("photos")}

              // value={price} // Display the price as a placeholder
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        </DialogDemo>
      </PageTitle>

      <ProductsComp 
        data={data}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setproductvalue={setproductvalue}
        handledelete={handledelete}
        />

       <ToastContainer />
    </>
  );
}

export default Products;
