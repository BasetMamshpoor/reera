const TripDescription = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">
        {a?.description || "Description"}
      </h3>

      <div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {data?.text || "No description provided."}
        </p>
      </div>
    </div>
  );
};
export default TripDescription;
