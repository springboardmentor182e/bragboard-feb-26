import Card from "../../../../components/ui/Card";

const MyShoutoutsCard = () => {
  const shoutouts = [
    { name: "Rahul", message: "Great teamwork!" },
    { name: "Ananya", message: "Amazing presentation!" },
  ];

  return (
    <Card className="p-6">

      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
        My Shout-Outs
      </h3>

      <div className="space-y-3">

        {shoutouts.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {item.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.message}
            </p>
          </div>
        ))}

      </div>

    </Card>
  );
};

export default MyShoutoutsCard;