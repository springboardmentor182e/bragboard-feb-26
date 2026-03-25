import { Heart } from "lucide-react";

const AllRecognitions = () => {
  const data = [
    {
      name: "Sarah Chen",
      role: "Senior Engineer",
      time: "2 hours ago",
      badge: "Innovation Star",
      message:
        "Alex has been an incredible mentor this quarter. Their guidance helped the entire team.",
      likes: 24,
    },
    {
      name: "Emma Watson",
      role: "Marketing Manager",
      time: "1 day ago",
      badge: "Going Above & Beyond",
      message:
        "Alex went the extra mile to ensure our campaign launch was perfect.",
      likes: 32,
    },
    {
      name: "David Kim",
      role: "Product Designer",
      time: "3 days ago",
      badge: "Team Player",
      message:
        "Always ready to help and collaborate. Amazing teamwork spirit!",
      likes: 18,
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          All Recognitions
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Complete history of your recognitions
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-6">

        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition"
          >

            {/* TOP */}
            <div className="flex justify-between items-center">

              <div>
                <p className="font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="text-sm text-slate-500">
                  {item.role}
                </p>
              </div>

              <p className="text-xs text-slate-400">
                {item.time}
              </p>

            </div>

            {/* BADGE */}
            <div className="mt-3 inline-block text-xs px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
              {item.badge}
            </div>

            {/* MESSAGE */}
            <p className="text-sm text-slate-600 mt-4">
              {item.message}
            </p>

            {/* FOOTER */}
            <div className="mt-4 flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full w-fit text-sm text-slate-600">
              <Heart size={14} className="text-red-500" />
              {item.likes}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AllRecognitions;