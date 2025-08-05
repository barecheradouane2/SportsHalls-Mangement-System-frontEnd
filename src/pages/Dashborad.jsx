import { useEffect, useState } from "react";
import axios from "axios";

import Cart from "../components/Cart";

import { FolderPlus } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Wallet } from "lucide-react";

import { ChartPieLegend } from "../components/ChartPieLegend";
import BarChartComponent from "../components/BarChartComponent";

function Dashborad() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [filter, setFilter] = useState("today");

  const [subdatacount, setsubdatacount] = useState(0);
  const [totalRevenue, settotalRevenue] = useState(0);
  const [totalexpense, settotalexpense] = useState(0);

  const [activitydata, setactivitydata] = useState([]);

  const [subscriptionData, setSubscriptionData] = useState([]);

  const [subcriptionstats,setsubscriptionstats]=useState([]);

  const [activeFilter, setActiveFilter] = useState("today");

  const buttons = [
    { label: "Today", value: "today" },
    { label: "This Month", value: "month" },
    { label: "This Year", value: "year" },
    { label: "Other", value: "other" },

  ];
  // const [loading, setLoading] = useState(true);

  console.log("search", setSearch);
  console.log("search", setPageNumber);
  console.log("search", setFilter);

  const getSubscriptions = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Subscriptions/getall-total-subsctipton?filter=${filter}`
      );

      const subscriptions = response.data;
      setsubdatacount(subscriptions);
    } catch (error) {
      console.error(
        "Error fetching members:",
        error.response?.data || error.message
      );
    }
  };

  const getTotalRevenue = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Revenues/get-total-revenue?filter=${filter}`
      );

      const revenue = response.data;
      settotalRevenue(revenue);
    } catch (error) {
      console.error(
        "Error fetching total revenue:",
        error.response?.data || error.message
      );
    }
  };

  const getTotalExpense = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Expenses/get-total-expenses?filter=${filter}`
      );

      const expense = response.data;
      settotalexpense(expense);
    } catch (error) {
      console.error(
        "Error fetching total expense:",
        error.response?.data || error.message
      );
    }
  };

  const getActivityData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Activities/get-all`
      );
     
      const activities = response.data;
      

      // Only update state once with all names
      const activityNames = activities.map((activity) => activity.name);
      setactivitydata(activityNames);
    } catch (error) {
      console.error(
        "Error fetching activities:",
        error.response?.data || error.message
      );
    }
  };

  // const getsubDatabyActivityName = async (activityname) => {
  //   try {
     
  //     const response = await axios.get(
  //       `https://localhost:7259/api/Subscriptions/getall-subsctipton?Search=${activityname}`
  //     );

  //     const subscriptionsstats = response.data.totalCount;

  //     setSubscriptionData((prev) => [
  //       ...prev,
  //       { name: activityname, count: subscriptionsstats },
  //     ]);
  //   } catch (error) {
  //     console.error(
  //       "Error fetching subscriptions by activity name:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  const getsubstatisticsbymonth = async () => {

      try {
      const response = await axios.get(
        `https://localhost:7259/api/Subscriptions/get-subscription-stats`
      );

     setsubscriptionstats(response.data);
    } catch (error) {
      console.error(
        "Error fetching subscriptions by activity name:",
        error.response?.data || error.message
      );
    }
  

  }

  // const oldactivitydata=["gym", "Swimming", "Yoga"]


  const fetchAllData = async () => {
  try {
    const results = await Promise.all(
      activitydata.map(async (name) => {
        try {
          const response = await axios.get(
            

            `https://localhost:7259/api/Subscriptions/getall-subsctipton?Search=${name}`
          );
          
          return {
            name,
            count: response.data.totalCount,
          };
        } catch (err) {
          console.error(`Failed to fetch for ${name}:`, err.message);
          return { name, count: 0 }; // Fallback to zero
        }
      })
    );

    console.log("Final subscription results:", results);
    setSubscriptionData(results);
  } catch (error) {
    console.error("Error in fetchAllData:", error.message);
  }
};


   
    
   




  // const getsubstatisticsbyname = async () => {
  //   try {

  //     // Fetch subscription data for each activity
  //     for (const activity of activitydata) {
  //       await getsubDatabyActivityName(activity.name);
  //     }

  //   } catch (error) {
  //     console.error(
  //       "Error fetching activities for subscription statistics:",
  //       error.response?.data || error.message
  //     );
  //   }
  // }

  useEffect(() => {
    getSubscriptions();
    getTotalRevenue();
    getTotalExpense();
    getActivityData();
    
   
    getsubstatisticsbymonth()
  }, [filter, pageNumber, search]);

useEffect(() => {







  // if (activitydata.length > 0) {
    fetchAllData(); // only run when activity names are available
  // }
}, []);






  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-wrap  justify-between gap-2  bg-gray-100 ">
        <Cart Amount={`${totalRevenue} DZD`} title="Total Revenue">
          <FolderPlus size={38} color="green" />
        </Cart>

        <Cart Amount={`${totalexpense} DZD`} title="Total Expense">
          <ShoppingCart size={38} color="red" />
        </Cart>

        <Cart Amount={`${subdatacount} `} title="Total Subscriptions">
          <CalendarCheck size={38} color="grey" />
        </Cart>

        <Cart Amount={`${totalRevenue - totalexpense} DZD`} title="Profits">
          <Wallet size={38} color="orange" />
        </Cart>
      </div>

      <div class="inline-flex">
        {buttons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => {
              setActiveFilter(btn.value);
              setFilter(btn.value);
            }}
            className={`font-semibold py-1 px-2 border 
            ${
              activeFilter === btn.value
                ? "bg-blue-500 text-white border-transparent"
                : "bg-transparent text-blue-700 border-blue-500 hover:bg-blue-500 hover:text-white hover:border-transparent"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 ">

        <div className="flex-1 min-w-[250px]">

          <BarChartComponent statitics={subcriptionstats}/>
         </div>

        <div className="flex-1  min-w-[250px]">
          <ChartPieLegend
            datatitle={activitydata}
            statitics={subscriptionData}
            // loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashborad;
