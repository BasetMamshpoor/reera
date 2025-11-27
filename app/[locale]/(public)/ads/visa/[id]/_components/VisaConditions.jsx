const VisaConditions = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">
        {a?.conditions || "Visa Conditions"}
      </h3>

      <div className="space-y-4">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Location:</span>
          <p className="font-medium">{data?.location || "Not specified"}</p>
        </div>

        <div>
          <span className="text-gray-600 dark:text-gray-400">
            Additional Information:
          </span>
          <p className="mt-2">
            {data?.text || "No additional conditions specified"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default VisaConditions;
