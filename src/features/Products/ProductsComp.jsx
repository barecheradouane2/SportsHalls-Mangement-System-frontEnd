import ProductItem from "./ProductItem";
import { useProductSales } from "../../Context/ProductSalesContext.jsx";

function ProductsComp({
  data,
  setSearch,
  setPageNumber,
  setproductvalue,
  handledelete,
}) {
  const { productSales, toggleSale } = useProductSales();

  console.log("ProductsComp productSales", productSales);
  console.log("ProductsComp setproductvalue", toggleSale);
  console.log("ProductsComp data", data);
  console.log("ProductsComp setSearch", setSearch);
  console.log("ProductsComp setPageNumber", setPageNumber);
  console.log("ProductsComp setproductvalue", setproductvalue);
  console.log("ProductsComp handledelete", handledelete);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {data.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          handledelete={handledelete}
          setproductvalue={setproductvalue}
        />
      ))}

      {/* <DialogDemo
        key={2}
        ref={offersref}
        btnName="Adding"
        btnIcon="+"
        title= "Add sale"
        handleSubmit={handleSubmitOffer(onSubmitOffer)}
      >
        <div className="grid gap-3 hidden">
          <Label htmlFor="id">offerid</Label>
          <Input
            id="offerid"
            name="offerid"
            type={"number"}
            {...registerOffer("offerid", { required: "offerid is required" })}
            defaultValue={0}
            // Set default to today
          />
          {errorsOffer.name && (
            <p className="text-sm text-red-500">{errorsOffer.name.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="OffersName">OffersName </Label>

          <Input
            id="OffersName"
            name="OffersName"
            type={"text"}
            {...registerOffer("OffersName", {
              required: "OffersName is required",
            })}

            // value={price} // Display the price as a placeholder
          />
          {errorsOffer.name && (
            <p className="text-sm text-red-500">{errorsOffer.name.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="Description">Duration Days</Label>

          <Input
            id="durationDays"
            name="durationDays"
            type={"number"}
            {...registerOffer("durationDays", {
              required: "durationDays is required",
            })}

            // value={price} // Display the price as a placeholder
          />
          {errorsOffer.name && (
            <p className="text-sm text-red-500">{errorsOffer.name.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="Description">price</Label>

          <Input
            id="price"
            name="price"
            type={"number"}
            {...registerOffer("price", {
              required: "price is required",
            })}

            // value={price} // Display the price as a placeholder
          />
          {errorsOffer.name && (
            <p className="text-sm text-red-500">{errorsOffer.name.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="ActivityName">Activites Name</Label>

          <select
            id="ActivityName"
            {...registerOffer("ActivityName", {
              required: "Activity is required",
            })}
            className="border p-2 rounded w-full"
          >
            <option value=""> Activity Name</option>

            {Activitesdata.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
          {errorsOffer.status && (
            <p className="text-red-500 text-sm">{errorsOffer.status.message}</p>
          )}
        </div>
      </DialogDemo> */}
    </div>
  );
}

export default ProductsComp;
