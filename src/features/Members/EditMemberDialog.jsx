import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Input from "@/components/Input";
import DialogDemo from "@/components/DialogDemo";
import { SquarePen } from "lucide-react";
import { useEffect } from "react";

function EditMemberDialog({ member, handleUpdate }) {
 const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm();

useEffect(() => {
  reset({
    fullName: member.fullName,
    phoneNumber: member.phoneNumber,
    status: String(member.status),
  });
}, [member, reset]);


  const onSubmit = (data) => {
    window.alert(member.id + " " +data.fullName + " " + data.phoneNumber + " " + data.status);
    handleUpdate(member.id, data);
  };

  return (
    <DialogDemo
      btnName={<SquarePen className="cursor-pointer" />}
      title="Editing member"
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-3">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          {...register("fullName", { required: "Full name is required" })}

          placeholder={member.fullName}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder={member.phoneNumber}
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
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
  );
}

export default EditMemberDialog;
