import React from "react";

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out"> 
       <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>
          <p className="text-xs mt-2 text-green-600 font-medium">
  +12% from last week
</p>
        </div>

<div className={`p-3 rounded-xl ${color} shadow-md`}>          <Icon className="text-xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;