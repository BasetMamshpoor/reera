const VisaDocuments = ({ data, a }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
      <h3 className="text-lg font-semibold">
        {a?.documents || "Required Documents"}
      </h3>

      <div>
        <span className="text-gray-600 dark:text-gray-400">
          Documents Required:
        </span>
        <p className="mt-2">{data?.Documents || "No documents specified"}</p>
      </div>
    </div>
  );
};
export default VisaDocuments;
