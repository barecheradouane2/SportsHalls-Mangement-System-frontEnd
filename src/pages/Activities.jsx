import React, { useEffect, useState } from "react";
import axios from "axios";

import ActivitesCard from "../features/Activites/ActivitesCard";

function Activities() {
  const [activites, setactivites] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7259/api/Activities/get-all")
      .then((response) => {
        setactivites(response.data);
        
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  if (activites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">No Activities Found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-4">
  {activites.map((activity) => (
    <ActivitesCard key={activity.id} activites={activity} />
  ))}
</div>

  );
}

export default Activities;
