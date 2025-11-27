const VisaBasicInfo = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">
        {a?.basic_info || "Basic Information"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Title:</span>
          <p className="font-medium">{data?.title}</p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">
            Origin Country:
          </span>
          <p className="font-medium">
            {data?.origin_country || "Not specified"}
          </p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">Visa Credit:</span>
          <p className="font-medium">{data?.credit || "Not specified"}</p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">Visa Date:</span>
          <p className="font-medium">
            {data?.date_of_get_visa || "Not specified"}
          </p>
        </div>
      </div>

      {data?.text && (
        <div>
          <span className="text-gray-600 dark:text-gray-400">Description:</span>
          <p className="mt-2">{data.text}</p>
        </div>
      )}
    </div>
  );
};
export default VisaBasicInfo;
