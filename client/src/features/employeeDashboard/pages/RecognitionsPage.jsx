import FeedCard from "../components/cards/FeedCard.jsx";
const data = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Engineer",
    time: "2 hours ago",
    badge: "Innovation Star",
    badgeColor: "bg-orange-100 text-orange-600 border-orange-200",
    message:
      "Alex has been an incredible mentor this quarter. Their guidance helped the entire team.",
    likes: 24,
    comments: 5,
    initials: "SC",
  },
  {
    id: 2,
    name: "Emma Watson",
    role: "Marketing Manager",
    time: "1 day ago",
    badge: "Going Above & Beyond",
    badgeColor: "bg-indigo-100 text-indigo-600 border-indigo-200",
    message:
      "Alex went the extra mile to ensure our campaign launch was perfect.",
    likes: 32,
    comments: 3,
    initials: "EW",
  },
];

const AllRecognitions = () => {
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
        {data.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default AllRecognitions;