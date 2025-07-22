// import PageTitle from "@/components/PageTitle";
// import DialogDemo from "@/components/DialogDemo";
// import TabsContent from "@/components/TabsContent";
// import { useForm } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useEffect, useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import UsersComp from "../features/Users/UsersComp";

// import { Search } from "lucide-react";

// function Users() {
//   const [data, setdata] = useState([]);
//   const [isedit, setisedit] = useState(false);
//   const addeditref = useRef(null);

//   const {
//     register,
//     setValue,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const loaddata = {
//         userName: data.userName,
//         displayName: data.displayName,
//         email: data.email,
//         password: data.password,
//         role: data.role,
//       };
//       var response = "";
//       if (data.id == 0) {
//         response = await axios.post(
//           "https://localhost:7259/api/Account/register",
//           loaddata
//         );
//       } else {
//         var updatedata = {
//           ...data,
//           id: data.id, // optional if you're just keeping the same id
//         };

//         response = await axios.put(
//           "https://localhost:7259/api/Account/update-user",
//           updatedata
//         );
//       }

//       toast.success("Success:", response.data.message);
//       await getUsersData(); // Refresh the subscriptions list after adding a new subscription
//       // Optional: reset the form after success
//     } catch (error) {
//       toast.error("Error:", error.response?.data || error.message);
//     }
//   };

//   const setemptyvalues = () => {
//     reset({
//       id: 0,
//       role: "",
//       email: "",
//       userName: "",
//       displayName: "",
//       password: "",
//     });
//     setisedit(false);
//   };

//   const getUsersData = async () => {
//     try {
//       const response = await axios.get(
//         `https://localhost:7259/api/Account/get-all-users`
//       );
//       setdata(response.data);
//     } catch (error) {
//       console.error("Error fetching users data:", error);
//     }
//   };
//   const handledelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://localhost:7259/api/Account/delete-user/${id}`
//       );
//       toast.success("Success:", response.data.message);
//       await getUsersData(); // Refresh the users list after deletion
//     } catch (error) {
//       toast.error("Error:", error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     getUsersData();
//   }, []);

//   return (
//     <>
//       <PageTitle title="Users">
//         <DialogDemo
//           ref={addeditref}
//           btnName="Adding"
//           btnIcon="+"
//           setisedit={setisedit}
//           title={isedit ? "Edit User" : "Add User"}
//           handleSubmit={handleSubmit(onSubmit)}
//           handleCancel={() => setemptyvalues()}
//         >
//           <div className="grid gap-3 hidden">
//             <Label htmlFor="id">id</Label>
//             <Input
//               id="id"
//               name="id"
//               type={"number"}
//               {...register("id", { required: "id is required" })}
//               defaultValue={0}
//               // Set default to today
//             />
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name.message}</p>
//             )}
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="userName">userName</Label>
//             <Input
//               id="userName"
//               name="userName"
//               type={"text"}
//               {...register("userName", { required: "userName is required" })}
//               placeholder="Enter userName"
//             />
//             {errors.userName && (
//               <p className="text-sm text-red-500">{errors.userName.message}</p>
//             )}
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="displayName">displayName</Label>
//             <Input
//               id="displayName"
//               name="displayName"
//               type={"text"}
//               {...register("displayName", {
//                 required: "displayName is required",
//               })}
//               placeholder="Enter displayName"
//             />
//             {errors.displayName && (
//               <p className="text-sm text-red-500">{errors.userName.message}</p>
//             )}
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="email">email</Label>
//             <Input
//               id="email"
//               name="email"
//               type={"email"}
//               {...register("email", { required: "email is required" })}
//               placeholder="Enter email"
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="password">password</Label>
//             <Input
//               id="password"
//               name="password"
//               type={"password"}
//               {...register("password", { required: "password is required" })}
//               placeholder="Enter password"
//             />
//             {errors.password && (
//               <p className="text-sm text-red-500">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="role">Role</Label>

//             <select
//               id="role"
//               {...register("role", {
//                 required: "role is required",
//               })}
//               className="border p-2 rounded w-full"
//             >
//               <option value=""> role</option>

//               <option key={1} value="Admin">
//                 {"Admin"}
//               </option>

//               <option key={0} value="User">
//                 {"User"}
//               </option>

//               <option key={0} value="Coach">
//                 {"Coach"}
//               </option>
//             </select>
//             {errors.role && (
//               <p className="text-red-500 text-sm">{errors.role.message}</p>
//             )}
//           </div>
//         </DialogDemo>
//       </PageTitle>

//       <div className="bg-white">
//         <TabsContent
//           tabs={[
//             <span className="flex gap-2">
//               <Search size={20} /> Users
//             </span>,
//           ]}
//           tabscontent={[
//             <UsersComp
//               key="current-UsrsCamp"
//               data={data}
//               handledelete={handledelete}
//               setValue={setValue}
//               ref={addeditref}
//               setisedit={setisedit} // Pass the ref to DialogDemo
//             />,
//           ]}
//         />
//       </div>

//       <ToastContainer />
//     </>
//   );
// }

// export default Users;

function Users() {
  return (
    <div>
      hello  Users Page
    </div>
  )
}

export default Users

