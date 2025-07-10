import PageTitle from "../components/PageTitle";
import TabsContent from "../components/TabsContent";
import MembersComp from "../features/Members/MembersComp";
import DialogDemo from "../components/DialogDemo";
import { Label } from "@/components/ui/label"; // Make sure path is correct
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";

// Make sure path is correct

function Members() {
  const [Members, setMembers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [isedit, setisedit] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addeditref = useRef(null);

const setemptyvalues = () => {
  reset({
    id: 0,
    fullName: "",
    phoneNumber: "",
    status: "",
  });
  setisedit(false);
};



  const onSubmit = async (data) => {
    try {

      setemptyvalues();
      const response = await axios.post(
        "https://localhost:7259/api/Members/add-Member",
        data
      ); // change URL
      console.log("Success:", response.data.message);
      toast.success("Member added successfully!");
      await getMembers(); // Refresh the members list after adding a new member
      reset(); // Optional: reset the form after success
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to add member. Please try again.");
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7259/api/Members/delete-Member/${id}`
      );
      console.log("Success:", response.data.message);
      toast.success("Member deleted successfully!");
      await getMembers(); // Refresh the members list after deletion
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to delete member. Please try again.");
    }
  };
  const handleUpdate = async (id, data) => {
    try {
      const response = await axios.put(
        `https://localhost:7259/api/Members/update-Member`,
        data
      );
      console.log("Success:", response.data.message);

      toast.success("Member updated successfully!");
      await getMembers(); // Refresh the members list after updating
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to update member. Please try again.");
    }
  };

  const getMembers = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Members/get-all-Members?Sort=${sort}&Search=${search}&PageSize=${pageSize}&PageNumber=${pageNumber}`
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
  useEffect(() => {
    getMembers();
  }, [pageNumber, search]);

  return (
    <>
      <PageTitle title="Members">
        
        <DialogDemo
          btnName="Adding"
          btnIcon="+"
          ref={addeditref}
          title={isedit ? "Edit Member" : "Add Member"}
          handleSubmit={handleSubmit(onSubmit)}

          handleCancel={()=>setemptyvalues()}

         
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
            <Label htmlFor="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              {...register("fullName", { required: "Full name is required" })}
              defaultValue="ahmed khiro"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              defaultValue="0658139571"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              {...register("status", { required: "Status is required" })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select status</option>
              <option value="0">Inactive</option>
              <option value="1">Active</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
        </DialogDemo>
      </PageTitle>

      <div className="bg-white">
        <TabsContent
          tabs={["Search Members"]}
          tabscontent={[
            <MembersComp
              key="members-comp"
              Members={Members}
              handledelete={handledelete}
              handleUpdate={handleUpdate}
              setisedit={setisedit}
              ref={addeditref}
              setValue={setValue}
              setPageSize={setPageSize}
              pageSize={pageSize}
              setSort={setSort}
              setSearch={setSearch}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
            />,
          ]}
        />
      </div>

      <ToastContainer />
    </>
  );
}

export default Members;
