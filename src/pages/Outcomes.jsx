import PageTitle from "@/components/PageTitle";
import DialogDemo from "@/components/DialogDemo";
import TabsContent from "@/components/TabsContent";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import OutcomesComp from "../features/Outcomes/OutcomesComp";

import { Search } from "lucide-react";

function Outcomes() {
  const [data, setdata] = useState([]);
 

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [isedit, setisedit] = useState(false);
  const addeditref = useRef(null);

  const {
    register,
    setValue,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getExpenses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Expenses/get-all-expenses?Search=${search}&PageNumber=${pageNumber}`
      );
      setdata(response.data.data);
    } catch (error) {
      console.error("Error fetching Expenses data:", error);
    }
  };

 

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7259/api/Expenses/delete-expenses/${id}`
      );
      toast.success("Success:", response.data.message);
      await getExpenses(); // Refresh the attendance list after deletion
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const loaddata = {
        date: data.date,
        name: data.name,
        note: data.note,
        totalPrice: data.totalPrice,
        type: data.type,

   
      };
      var response = "";
      if (data.id == 0) {
        response = await axios.post(
          "https://localhost:7259/api/Expenses/add-expenses",
          loaddata
        );
      } else {
        var updatedata = {
          ...data,
          id: data.id, // optional if you're just keeping the same id
        };
        alert("Updating attendance");
        response = await axios.put(
          "https://localhost:7259/api/Expenses/update-expenses",
          updatedata
        );
      }

      toast.success("Success:", response.data.message);
      await getExpenses(); // Refresh the subscriptions list after adding a new subscription
      // Optional: reset the form after success
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getExpenses();
  
  }, [search, pageNumber]);

  return (
    <>
      <PageTitle title="Outcomes">
        <DialogDemo
          ref={addeditref}
          btnName="Adding"
          btnIcon="+"
          setisedit={setisedit}
          title={isedit ? "Edit outcome" : "Add outcome"}
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
            <Label htmlFor="name"> Name</Label>

            

            <Input
              id="name"
              name="name"
              type={"text"}
              {...register("name", { required: "Name is required" })}
              // Set default to today
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date"> Date </Label>
            <Input
              id="date"
              name="date"
              type={"date"}
              {...register("date", {
                required: "date is required",
              })}
              defaultValue={new Date().toISOString().split("T")[0]} // Set default to today
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="totalPrice">totalPrice</Label>
            <Input
              id="totalPrice"
              name="totalPrice"
              type={"number"}
              {...register("totalPrice", { required: "totalPrice is required" })}
              // Set default to today
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
              {...register("note", { required: "note is required" })}
              // Set default to today
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              name="type"
              {...register("type", { required: "Type is required" })}
              className="border p-2 rounded w-full"
              defaultValue={0} // Default to "subscription"
            >
              <option value={0}>oneTime</option>
              <option value={1}>monthly</option>
              <option value={2}>yearly</option>
            </select>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        </DialogDemo>
      </PageTitle>

      <div className="bg-white">
        <TabsContent
          tabs={[
            <span className="flex gap-2">
              <Search size={20} /> Incomes
            </span>,
          ]}
          tabscontent={[
            <OutcomesComp
              key="current-outcomes"
              data={data}
              handledelete={handledelete}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              setSearch={setSearch}
              search={search}
             
              setValue={setValue}
              ref={addeditref}
              setisedit={setisedit} // Pass the ref to DialogDemo
            />,
          ]}
        />
      </div>

      <ToastContainer />
    </>
  );
}

export default Outcomes;
