const TripDetails = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">
        {a?.trip_details || "Trip Details"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-gray-600 dark:text-gray-400">
            Weight Capacity:
          </span>
          <p className="font-medium">
            {data?.weight ? `${data.weight} kg` : "Not specified"}
          </p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">Currency:</span>
          <p className="font-medium">{data?.currency || "Not specified"}</p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">End Date:</span>
          <p className="font-medium">
            {data?.end_date
              ? new Date(data.end_date).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">Location:</span>
          <p className="font-medium">{data?.location || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
};
export default TripDetails;
