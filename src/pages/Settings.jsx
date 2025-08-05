import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import DropComponent from "../components/DropComponent";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import DialogDemo from "@/components/DialogDemo";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Settings() {
  const [Activitesdata, setActivitesdata] = useState([]);
  const [Offersdata, setOffersdata] = useState([]);
  const [Usersdata, setUsersdata] = useState([]);

  const [existingPhoto, setExistingPhoto] = useState(null);

  const activityref = useRef(null);
   const offersref = useRef(null);
   const usersref = useRef(null);

  // const existingPhotoRef = useRef(null);
  // const offersref = useRef(null);

  const [isedit, setisedit] = useState(false);
  const [isOfferEdit, setIsOfferEdit] = useState(false);
  const [isUserEdit, setIsUserEdit] = useState(false);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7259/api/Activities/get-all"
      );
      setActivitesdata(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7259/api/Offers/get-all-offers"
      );
      setOffersdata(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };
  const fetchUsers = async () => {
     try {
      const response = await axios.get(
        `https://localhost:7259/api/Account/get-all-users`
      );
      setUsersdata(response.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }

  }


  const AddActivities = async (data) => {
    try {
      const response = await axios.post(
        "https://localhost:7259/api/Activities/add-activity",
        data
      );
      console.log("Activity added successfully:", response.data);
      fetchActivities(); // Refresh the activities list
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };
  const AddOffers = async (data) => {
    try {
      const response = await axios.post(
        "https://localhost:7259/api/Offers/add-offer",
        data
      );
      console.log("Offer added successfully:", response.data);
      fetchOffers(); // Refresh the offers list
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

  const AddUser = async (data) => {
    try{
      const response = await axios.post(
        "https://localhost:7259/api/Account/register",
        data
      );
        toast.success("Success:", response.data.message);
     await fetchUsers(); // Refresh the users list

    }catch(error){
      console.error("Error adding user:", error);
    }


  }
   

  const handleDeleteActivity = async (id) => {
    try {
      await axios.delete(
        `https://localhost:7259/api/Activities/delete-activity/${id}`
      );
      fetchActivities(); // Refresh the activities list
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };
  const handleDeleteOffer = async (id) => {
    try {
      await axios.delete(
        `https://localhost:7259/api/Offers/delete-offer/${id}`
      );
      fetchOffers(); // Refresh the offers list
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
     var response = await axios.delete(
        `https://localhost:7259/api/Account/delete-user/${id}`
      );
        toast.success("Success:", response.data.message);
      await fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  useEffect(() => {
     fetchActivities();
     fetchOffers();
     fetchUsers();
  }, [Activitesdata, Offersdata, Usersdata]);

  const Activitytitle = ["name", "description"];
  const Offerstitle = ["name", "durationDays", "price", "activitiesName"];
  const Userstitle = ["displayName", "userName", "email"];


  const {
    register,
    setValue,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const {
  register: registerOffer,
  handleSubmit: handleSubmitOffer,
  formState: { errors: errorsOffer }
} = useForm();


const {  register: registerUser,
  handleSubmit: handleSubmitUser,
  formState: { errors: errorsUser }
} = useForm();


  const onSubmitActivity = async (data) => {
    try {
     

      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Description", data.description);

      if (data.photos && data.photos[0]) {
        alert("Appending new photo: " + data.photos[0]);
        formData.append("Photos", data.photos[0]); // Append the file
      }

      let response = "";

      if (data.id === "0" || data.id === 0) {
        response = await axios.post(
          "https://localhost:7259/api/Activities/add-activity",
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

        // formData.append(
        //   "Photos",
        //   data.photos && data.photos[0]
        //     ? data.photos[0]
        //     : existingPhotoRef.current.value // Append the new photo if it exists
        // );

        // Assuming backend expects this too

        response = await axios.put(
          "https://localhost:7259/api/Activities/update-activity",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success("Success: " + response.data.message);
      await fetchActivities(); // Refresh the list
    } catch (error) {
      toast.error("Error: " + (error.response?.data || error.message));
    }
  };
  const onSubmitOffer = async (data) => {
    try {
      
     
      let lodeddata = {
        name: data.OffersName,
        durationDays: data.durationDays,
        price: data.price,
        activitiesID: data.ActivityName,
      };

      let response = "";

      if (data.offerid === "0" || data.offerid === 0) {
        response = await axios.post(
          "https://localhost:7259/api/Offers/add-offer",
          lodeddata
        );
      } else {
        
        lodeddata ={
          ...lodeddata,
          id: data.offerid,
        }

        response = await axios.put(
          "https://localhost:7259/api/Offers/update-offer",
          lodeddata
        );
      }

      toast.success("Success: " + response.data.message);
      await fetchOffers(); // Refresh the list
    } catch (error) {
      toast.error("Error: " + (error.response?.data || error.message));
    }
  }
  const onSubmitUser = async (data) => {

      try {
      const loaddata = {
        userName: data.userName,
        displayName: data.displayName,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      var response = "";
      if (data.id == 0) {
        response = await axios.post(
          "https://localhost:7259/api/Account/register",
          loaddata
        );
      } else {
        var updatedata = {
          ...data,
          id: data.id, // optional if you're just keeping the same id
        };

        response = await axios.put(
          "https://localhost:7259/api/Account/update-user",
          updatedata
        );
      }

      toast.success("Success:", response.data.message);
     // Refresh the subscriptions list after adding a new subscription
      // Optional: reset the form after success
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }





  }

  const setActivityValue = (activity) => {
    setValue("id", activity.id);
    setValue("name", activity.name);
    setValue("description", activity.description);
    setValue(
      "photos",
      `https://localhost:7259/${activity.photos[0].imageName}`
    ); // Assuming photos is an array and you want the first image
    setisedit(true);

    setExistingPhoto(activity.photos[0].imageName || null); // Set the existing photo

    alert("setActivityValue called with activity: " + JSON.stringify(activity));

    // existingPhotoRef.current.value = activity.photos[0].imageName || ""; // Set the existing photo reference

    activityref.current.click();
  };

  const setOfferValue = (offer) => {
    setValue("offerid", offer.id);
    setValue("OffersName", offer.name);
    setValue("durationDays", offer.durationDays);
    setValue("price", offer.price);
    setValue("ActivityName", offer.activitiesID);
    setIsOfferEdit(true);
    offersref.current.click();
  };
  const setUserValue = (user) => {
    setValue("id", user.id);
    setValue("userName", user.userName);
    setValue("displayName", user.displayName);
    setValue("email", user.email);
    setValue("role", user.role);
    setIsUserEdit(true);
    usersref.current.click();

  };







  if (!Activitesdata || Activitesdata.length === 0) {
    return <div>Loading activities...</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <DropComponent
          data={Activitesdata}
          title="Activities"
          datatitle={Activitytitle}
          handledelete={handleDeleteActivity}
          setvaluefunc={setActivityValue}

          // handleDeleteActivity={handleDeleteActivity}
          // handleDeleteOffer={handleDeleteOffer}
        >
          <DialogDemo
          key={1}
            ref={activityref}
            btnName="Adding"
            btnIcon="+"
            setisedit={setisedit}
            title={isedit ? "Edit " : "Add "}
            handleSubmit={handleSubmit(onSubmitActivity)}
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
                {...register("name", { required: "name ** is required" })}

                // value={price} // Display the price as a placeholder
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="Description">Description</Label>

              <Input
                id="Description"
                name="Description"
                type={"text"}
                {...register("description", {
                  required: "description is required",
                })}

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
        </DropComponent>

        <DropComponent
          data={Offersdata}
          title="Offers"
          datatitle={Offerstitle}
          handledelete={handleDeleteOffer}
          setvaluefunc={setOfferValue}

          // handleDeleteActivity={handleDeleteActivity}
          // handleDeleteOffer={handleDeleteOffer}
        >
          <DialogDemo
           key={2}
            ref={offersref}
            btnName="Adding"
            btnIcon="+"
            setisedit={setIsOfferEdit}
            title={isOfferEdit ? "Edit offer " : "Add  offer"}
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
                {...registerOffer("OffersName", { required: "OffersName is required" })}

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
                  required: "Activity is required"
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
          </DialogDemo>
        </DropComponent>

        <DropComponent
          data={Usersdata}
          title="Users"
          datatitle={Userstitle}
          handledelete={handleDeleteUser}
          setvaluefunc={setUserValue}

          // handleDeleteActivity={handleDeleteActivity}
          // handleDeleteOffer={handleDeleteOffer}
        >
          <DialogDemo
            key={3}
              ref={usersref}
              btnName="Adding"
              btnIcon="+"
              setisedit={setIsUserEdit}
              title={isUserEdit ? "Edit User " : "Add User"}
              handleSubmit={handleSubmitUser(onSubmitUser)}
          >
         
         <div className="grid gap-3 hidden">
            <Label htmlFor="id">id</Label>
            <Input
              id="id"
              name="id"
              type={"number"}
              {...registerUser("id", { required: "id is required" })}
              defaultValue={0}
              // Set default to today
            />
            {errorsUser.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="userName">userName</Label>
            <Input
              id="userName"
              name="userName"
              type={"text"}
              {...registerUser("userName", { required: "userName is required" })}
              placeholder="Enter userName"
            />
            {errorsUser.userName && (
              <p className="text-sm text-red-500">{errorsUser.userName.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="displayName">displayName</Label>
            <Input
              id="displayName"
              name="displayName"
              type={"text"}
              {...registerUser("displayName", {
                required: "displayName is required",
              })}
              placeholder="Enter displayName"
            />
            {errorsUser.displayName && (
              <p className="text-sm text-red-500">{errorsUser.displayName.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">email</Label>
            <Input
              id="email"
              name="email"
              type={"email"}
              {...registerUser("email", { required: "email is required" })}
              placeholder="Enter email"
            />
            {errorsUser.email && (
              <p className="text-sm text-red-500">{errorsUser.email.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password">password</Label>
            <Input
              id="password"
              name="password"
              type={"password"}
              {...registerUser("password", { required: "password is required" })}
              placeholder="Enter password"
            />
            {errorsUser.password && (
              <p className="text-sm text-red-500">{errorsUser.password.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>

            <select
              id="role"
              {...registerUser("role", {
                required: "role is required",
              })}
              className="border p-2 rounded w-full"
            >
              <option value=""> role</option>

              <option key={1} value="Admin">
                {"Admin"}
              </option>

              <option key={0} value="User">
                {"User"}
              </option>

              <option key={0} value="Coach">
                {"Coach"}
              </option>
            </select>
            {errorsUser.role && (
              <p className="text-red-500 text-sm">{errorsUser.role.message}</p>
            )}
          </div>
        </DialogDemo>

         </DropComponent>

      </div>

      <ToastContainer />
    </>
  );
}

export default Settings;
