import PageTitle from "@/components/PageTitle";
import DialogDemo from "@/components/DialogDemo";
import TabsContent from "@/components/TabsContent";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {  useEffect, useRef, useState  } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AttendanceCamp from "../features/Attendance/AttendanceCamp";

import { Search } from 'lucide-react';



function Attendance() {
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

  const getAttendance = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Attendances/get-all-Attendances?Search=${search}&PageNumber=${pageNumber}`
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
      setActivities(response.data);
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
        `https://localhost:7259/api/Attendances/delete-Attendances/${id}`
      );
      toast.success("Success:", response.data.message);
      await getAttendance(); // Refresh the attendance list after deletion
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };  

  const setemptyvalues = () => {
  reset({
    id: 0,
    attendanceDate: "",
    activitiesID: "",
    status: "",
    membersID: "",

  });
  setisedit(false);
};




  const onSubmit = async (data) => {

      console.log("Submitted data:", data);

    try {
      const loaddata = {
        attendanceDate: data.attendanceDate,
        // activityName: data.ActivityName,
        status: parseInt(data.status),
        activitiesID: data.activitiesID,
        membersID: parseInt(data.membersID),
        
      };
      var response = "";
      if (data.id == 0) {

        alert(loaddata.attendanceDate +""+loaddata.status +""+loaddata.activitiesID +""+loaddata.membersID);
        response = await axios.post(
          "https://localhost:7259/api/Attendances/add-Attendances",
          loaddata
        );
      } else {
        var updatedata = {
          ...data,
          id: data.id, // optional if you're just keeping the same id
        };
        alert("Updating attendance");
        response = await axios.put(
          "https://localhost:7259/api/Attendances/update-Attendances",
          updatedata
        );
      }

      toast.success("Success:", response.data.message);
      await getAttendance(); // Refresh the subscriptions list after adding a new subscription
      // Optional: reset the form after success
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAttendance();
    getMembers();
    getactivites();
  }, [search, pageNumber]);

  return (
    <>
      <PageTitle title="Attendance">
        <DialogDemo
             ref={addeditref}
          btnName="Adding"
          btnIcon="+"
             setisedit={setisedit}
             title={isedit ? "Edit Attendance" : "Add Attendance"}
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
            <Label htmlFor="startDate">Attendance Date</Label>
            <Input
              id="attendanceDate"
              name="startDate"
              type={"date"}
              {...register("attendanceDate", { required: "startDate is required" })}
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
              {...register("activitiesID", {
                required: "Activity is required"
              })}
              className="border p-2 rounded w-full"
            >
              <option value=""> Activity Name</option>

              {activites.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>

            <select
              id="status"
              {...register("status", {
                required: "status is required"
              })}
              className="border p-2 rounded w-full"
            >
              <option value=""> Status</option>

               <option key={1} value={1}>
                  {"Present"}
                </option>

              <option key={0} value={0}>
                {"Absent"}
              </option>
     
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
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
          tabs={[  <span className="flex gap-2"><Search    size={20}/> Attendance</span> 

          ] }
          tabscontent={[
            <AttendanceCamp
              key="current-AttendanceCamp"
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
            />
            
          



          ]}
        />
      </div>

      <ToastContainer />
    </>
  );
}

export default Attendance;
