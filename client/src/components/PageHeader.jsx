const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-500 text-sm mt-1">
          {subtitle}
        </p>
      )}
      <hr className="mt-6 border-gray-200" />
    </div>
  );
};

export default PageHeader;