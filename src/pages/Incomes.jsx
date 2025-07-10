import PageTitle from "@/components/PageTitle";
import DialogDemo from "@/components/DialogDemo";
import TabsContent from "@/components/TabsContent";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import IncomesComp from "../features/Incomes/IncomesComp";

import { Search } from "lucide-react";

function Incomes() {
  const [data, setdata] = useState([]);
  const [members, setMembers] = useState([]);
  const [activites, setActivities] = useState([]);

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [isedit, setisedit] = useState(false);
  const addeditref = useRef(null);

  const {
    register,
    setValue,
     reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getRevenues = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Revenues/get-all-revenues?Search=${search}&PageNumber=${pageNumber}`
      );
      setdata(response.data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Members/get-all-Members`
      );
      setMembers(response.data.data);
      // Handle the fetched members data as needed
    } catch (error) {
      console.error(
        "Error fetching members:",
        error.response?.data || error.message
      );
    }
  };

  const getactivites = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Activities/get-all`
      );
      setActivities(response.data.data);
      // Handle the fetched activities data as needed
    } catch (error) {
      console.error(
        "Error fetching activities:",
        error.response?.data || error.message
      );
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7259/api/Revenues/delete-revenue/${id}`
      );
      toast.success("Success:", response.data.message);
      await getRevenues(); // Refresh the attendance list after deletion
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };

  const onSubmit = async (data) => {
    console.log("Submitted data:", data);

    alert(
      data.revenueDate
      +" "+data.note+"  "+ data.amount

    )

    try {
      const loaddata = {
        revenueDate: data.revenueDate,
        note: data.note,
        amount: data.amount
        // activityName: data.ActivityName,
        // membersID: parseInt(data.membersID),
      };
      var response = "";
      if (data.id == 0) {
        
        response = await axios.post(
          "https://localhost:7259/api/Revenues/create-revenue",
          loaddata
        );
      } else {
        var updatedata = {
          ...data,
          id: data.id, // optional if you're just keeping the same id
        };
        alert("Updating attendance");
        response = await axios.put(
          "https://localhost:7259/api/Revenues/update-revenue",
          updatedata
        );
      }

      toast.success("Success:", response.data.message);
      await getRevenues(); // Refresh the subscriptions list after adding a new subscription
      // Optional: reset the form after success
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };

   const setemptyvalues = () => {
  reset({
    id: 0,
    revenueDate: "",
    amount: "",
    note: "",
    membersID: "",

  });
  setisedit(false);
};




  useEffect(() => {
    getRevenues();
    getMembers();
    getactivites();
  }, [search, pageNumber]);
  return (
    <>
      <PageTitle title="Incomes">
        <DialogDemo
          ref={addeditref}
          btnName="Adding"
          btnIcon="+"
          setisedit={setisedit}
          title={isedit ? "Edit Incomes" : "Add Incomes"}
          handleSubmit={handleSubmit(onSubmit)}
          handleCancel={() => setemptyvalues()}
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
            <Label htmlFor="revenueDate">Revenue Date </Label>
            <Input
              id="revenueDate"
              name="revenueDate"
              type={"date"}
              {...register("revenueDate", {
                required: "revenueDate is required",
              })}
              defaultValue={new Date().toISOString().split("T")[0]} // Set default to today
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="Amount">Amount</Label>
            <Input
              id="Amount"
              name="Amount"
              type={"number"}
              {...register("amount", { required: "Amount is required" })}
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
      </PageTitle>

      <div className="bg-white">
        <TabsContent
          tabs={[
            <span className="flex gap-2">
              <Search size={20} /> Incomes
            </span>,
          ]}
          tabscontent={[
            <IncomesComp
              key="current-Incomes"
              data={data}
              handledelete={handledelete}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              setSearch={setSearch}
              search={search}
              activitesdata={activites}
              activites={activites}
              members={members}
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

export default Incomes;
