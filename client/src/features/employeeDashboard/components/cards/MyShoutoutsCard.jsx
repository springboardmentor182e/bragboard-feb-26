import Card from "../../../../components/ui/Card";

const MyShoutoutsCard = () => {
  const shoutouts = [
    { name: "Rahul", message: "Great teamwork!" },
    { name: "Ananya", message: "Amazing presentation!" },
  ];

  return (
    <Card className="p-6">

      <h3 className="font-semibold text-slate-900 mb-4">
        My Shout-Outs
      </h3>

      <div className="space-y-3">

        {shoutouts.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200"
          >
            <p className="text-sm font-medium text-slate-800">
              {item.name}
            </p>
            <p className="text-xs text-slate-500">
              {item.message}
            </p>
          </div>
        ))}

      </div>

    </Card>
  );
};

export default MyShoutoutsCard;