
function StatCard({ title, value, description, color }) {

  return (

    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

      {/* Card Title */}
      <p className="text-sm text-gray-500 font-medium">
        {title}
      </p>

      {/* Card Value */}
      <h2 className={`text-3xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

      {/* Card Description */}
      <p className="text-xs text-gray-400 mt-2">
        {description}
      </p>

    </div>

  );

}

export default StatCard;
