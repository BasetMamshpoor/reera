const TripRouteInfo = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">
        {a?.route_info || "Route Information"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Origin */}
        <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">
            Origin
          </h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Country:
              </span>
              <p className="font-medium">
                {data?.origin_country || "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                City:
              </span>
              <p className="font-medium">
                {data?.origin_city || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">
            Destination
          </h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Country:
              </span>
              <p className="font-medium">
                {data?.destination_country || "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                City:
              </span>
              <p className="font-medium">
                {data?.destination_city || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripRouteInfo;
