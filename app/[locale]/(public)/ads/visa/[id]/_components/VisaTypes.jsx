const VisaTypes = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">{a?.visa_types || "Visa Types"}</h3>

      <div className="flex flex-wrap gap-2">
        {data?.types?.map((type) => (
          <span
            key={type.id}
            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
          >
            {type.name}
          </span>
        ))}

        {(!data?.types || data.types.length === 0) && (
          <p className="text-gray-500">No visa types specified</p>
        )}
      </div>
    </div>
  );
};
export default VisaTypes;
