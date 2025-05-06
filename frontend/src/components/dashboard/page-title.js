const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-4 border-b pb-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
