const TripBasicInfo = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">
        {a?.basic_info || "Basic Information"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Trip Title:</span>
          <p className="font-medium">{data?.title}</p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">Price:</span>
          <p className="font-medium">
            {data?.price} {data?.currency}
          </p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
          <p className="font-medium">
            {data?.start_date
              ? new Date(data.start_date).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">Trip Type:</span>
          <p className="font-medium capitalize">
            {data?.trip_way ? data.trip_way.replace("_", " ") : "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripBasicInfo;
