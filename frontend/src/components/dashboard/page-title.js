const PageTitle = ({ title, subtitle, children }) => {
  return (
    <div className="mb-4 border-b pb-4 flex justify-between mt-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default PageTitle;
