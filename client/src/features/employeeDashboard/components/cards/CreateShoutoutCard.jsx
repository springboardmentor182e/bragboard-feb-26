import { Plus } from "lucide-react";
import Card from "../../../../components/ui/Card";

const CreateShoutoutCard = () => {
  return (
    <Card className="p-6">

      <h3 className="font-semibold text-slate-900 mb-2">
        Create Shout-Out
      </h3>

      <p className="text-sm text-slate-500 mb-4">
        Recognize someone for their great work
      </p>

      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 transition">
        <Plus size={16} />
        Give Recognition
      </button>

    </Card>
  );
};

export default CreateShoutoutCard;