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
import { House } from 'lucide-react';

import { CircleSlash } from 'lucide-react';
import { CircleAlert } from 'lucide-react';


function Subscriptions() {
  const [data,setData] = useState([]);
  const [outdatedata,setoutdatedata] = useState([]);
  const [notyetpaiddata, setnotyetpaiddata] = useState([]);

  const [activites, setActivities] = useState([]);
  const [activityoffer, setActivityOffer] = useState(null); // Default to the first activity's name or an empty string

  const [offers, setOffers] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [isedit, setisedit] = useState(false);
  const addeditref = useRef(null);

  // const [price, setprice] = useState(0);

 const getSubscriptions = async () => {
  try {
    const response = await axios.get(
      `https://localhost:7259/api/Subscriptions/getall-subsctipton?Search=${search}&PageNumber=${pageNumber}`
    );

    const subscriptions = response.data.data;
    setData(subscriptions);

    const datanotyetpaid = subscriptions.filter(
      (item) => item.isFullPaid === false
    );

   const today = new Date();

const dataoutdated = subscriptions.filter((item) => {
  const endDate = new Date(item.endDate);
  return endDate <= today;
});

    setnotyetpaiddata(datanotyetpaid);
    setoutdatedata(dataoutdated);




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

  const getoffers = async () => {
    try {
      if (activityoffer === null || activityoffer === "") {
        // alert("Please select an activity first.");
        return;
      }
      const response = await axios.get(
        `https://localhost:7259/api/Offers/get-all-offers?Search=${activityoffer}`
      );
      
      setOffers(response.data.data);
      // Handle the fetched offers data as needed
    } catch (error) {
      console.error(
        "Error fetching offers:",
        error.response?.data || error.message
      );
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

  // const getOutdatedSubscriptions = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://localhost:7259/api/Subscriptions/getall-subsctipton?EndDate=${new Date().toISOString().split('T')[0]}`
  //     );
  //     setoutdatedata(response.data.data);
  //     // Handle the fetched outdated subscriptions data as needed
  //   } catch (error) {
  //     console.error(
  //       "Error fetching outdated subscriptions:",
  //       error.response?.data || error.message
  //     );
  //   }
  // }

  const {
    register,
    setValue,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const loaddata = {
        startDate: data.startDate,
        // activityName: data.ActivityName,
        offersID: parseInt(data.offersID),
        amount: parseFloat(data.amount),
        membersID: parseInt(data.membersID),
      };
      var response = "";
      if (data.id == 0) {
        response = await axios.post(
          "https://localhost:7259/api/Subscriptions/add-subscription",
          loaddata
        );
      } else {
        var updatedata = {
          ...data,
          id: data.id, // optional if you're just keeping the same id
        };

        response = await axios.put(
          "https://localhost:7259/api/Subscriptions/update-subscription",
          updatedata
        );
      }

      toast.success("Success:", response.data.message);
      await getSubscriptions(); // Refresh the subscriptions list after adding a new subscription
      // Optional: reset the form after success
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7259/api/Subscriptions/delete-subscription/${id}`
      );
      toast.success("Success:" + response.data.message);

      await getSubscriptions(); // Refresh the subscriptions list after deletion
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const response = await axios.put(
        `https://localhost:7259/api/Subscriptions/update-subscription`,
        data
      );
      console.log("Success:", response.data.message);
      await getSubscriptions(); // Refresh the subscriptions list after updating
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSubscriptions();
    getactivites();

    // getOutdatedSubscriptions();

    getoffers();
    getMembers();
  }, [activityoffer, pageNumber, search]);

  return (
    <>
      <PageTitle title="Subscriptions">
        <DialogDemo
          ref={addeditref}
          btnName="Adding"
          btnIcon="+"
          setisedit={setisedit}
          title={isedit ? "Edit Subscription" : "Add Subscription"}
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
              {...register("ActivityName", {
                required: "Activity is required",
                onChange: (e) => {
                  const selectedActivityId = e.target.value;
                  setActivityOffer(selectedActivityId); // update your state or fetch offers
                },
              })}
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

                  setValue("amount", selectedOffer.price);
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
      </PageTitle>

      <div className="bg-white">
        <TabsContent
          tabs={[  <span className="flex gap-2"><House   size={20}/> Subscriptions</span> ,
            
            <span className="flex gap-2"> <CircleSlash  size={20}/> OutDated Subscriptions</span>,
            <span className="flex gap-2"> <CircleAlert   size={20}/> Not Yet Paid</span>

          ] }
          tabscontent={[
            <CurrentSubscriptions
              key="current-subscriptions"
              data={data}
              handledelete={handledelete}
              handleUpdate={handleUpdate}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              setSearch={setSearch}
              search={search}
              activitesdata={activites}
              setActivityOffer={setActivityOffer}
              activites={activites}
              activityoffer={activityoffer}
              offers={offers}
              members={members}
              setValue={setValue}
              ref={addeditref}
              setisedit={setisedit} // Pass the ref to DialogDemo
            />,
              <CurrentSubscriptions
              key="outdated-subscriptions"
              data={outdatedata}
              handledelete={handledelete}
              handleUpdate={handleUpdate}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              setSearch={setSearch}
              search={search}
              activitesdata={activites}
              setActivityOffer={setActivityOffer}
              activites={activites}
              activityoffer={activityoffer}
              offers={offers}
              members={members}
              setValue={setValue}
              ref={addeditref}
              setisedit={setisedit} // Pass the ref to DialogDemo
            />,
            
              <CurrentSubscriptions
              key="notyetpaid-subscriptions"
              data={notyetpaiddata}
              handledelete={handledelete}
              handleUpdate={handleUpdate}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              setSearch={setSearch}
              search={search}
              activitesdata={activites}
              setActivityOffer={setActivityOffer}
              activites={activites}
              activityoffer={activityoffer}
              offers={offers}
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

export default Subscriptions;
