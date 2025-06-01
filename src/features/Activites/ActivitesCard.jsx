import { Eye } from "lucide-react";

function ActivitesCard({ activites }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded overflow-hidden shadow-lg cursor-pointer">
      <img
        className="w-full  object-cover"
        src={`https://localhost:7259/${activites.photos[0].imageName}`}
        alt={activites.name}
      />
      <div className="px-4 py-4">
        <div className="flex justify-between py-2">
          <span className="font-bold text-l ">{activites.name}</span>

          <span>
            {" "}
            <Eye />
          </span>
        </div>
        <hr />
        <p className="text-gray-700 py-2 text-base">{activites.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span> */}
      </div>
    </div>
  );
}

export default ActivitesCard;
