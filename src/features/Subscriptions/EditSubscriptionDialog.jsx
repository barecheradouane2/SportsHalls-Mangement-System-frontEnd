import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Input from "@/components/Input";
import DialogDemo from "@/components/DialogDemo";
import { SquarePen } from "lucide-react";
 import { useEffect } from "react";





function EditSubscriptionDialog({sub,setActivityOffer,activites,offers,activityoffer,members,handleUpdate}) {

     const {
  register,
  setValue,
  handleSubmit,
  formState: { errors },
//   reset,
} = useForm();

console.log("sub",sub);

useEffect(() => {

    // asign the defualt values to the form field


 



  
}, []);


  const onSubmit = (data) => {
  handleUpdate(data);

  





  };
    return (
         <DialogDemo
          btnName={<SquarePen className="cursor-pointer" />}
          btnIcon=""
          title="Edit Subscription"
          handleSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-3">
            <Label htmlFor="startDate">startDate</Label>
            <Input
              id="startDate"
              name="startDate"
              type={"date"}
              {...register("startDate", { required: "startDate is required" })}
              defaultValue={new Date().toISOString().split("T")[0]} // Set default to today
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="ActivityName">Activites Name</Label>

            <select
              id="ActivityName"
              onChange={(e) => {
                const selectedActivityId = e.target.value;
                setActivityOffer(selectedActivityId);
                // Optionally, you can fetch offers based on the selected activity
                // getoffers(selectedActivityId);
              }}
              className="border p-2 rounded w-full"
            >
              <option value=""> Activity Name</option>

              {activites.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="OfferName">offer </Label>

            <select
              id="OfferName"
              disabled={!activityoffer} // Disable if no activity is selected
              className="border p-2 rounded w-full"
              {...register("offersID", {
                required: "Offer is required",
                onChange: (e) => {
                  const selectedOfferId = parseInt(e.target.value);
                  const selectedOffer = offers.find(
                    (offer) => offer.id === selectedOfferId
                  );

                  console.log("Selected offer ID:", selectedOfferId);
                  console.log("Selected offer:", selectedOffer);
                  // setprice(selectedOffer ? selectedOffer.price : 0);

                    setValue("amount",selectedOffer.price );

                },
              })}
            >
              <option value=""> offer Name</option>

              {offers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.name}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="Amount">Amount</Label>

            <Input
              id="Amount"
              name="Amount"
              type={"number"}
              {...register("amount", { required: "Amount is required" })}
            

              // value={price} // Display the price as a placeholder
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="MemberName">Members Name</Label>

            <select
              id="MemberName"
              {...register("membersID", { required: "Member is required" })}
              className="border p-2 rounded w-full"
            >
              <option value=""> Member Name</option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.fullName}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
        </DialogDemo>
    )
}

export default EditSubscriptionDialog
