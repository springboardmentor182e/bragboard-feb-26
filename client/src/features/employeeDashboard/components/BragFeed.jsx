import { useState } from "react";

const mockBrags = [
  {
    id: 1,
    author: "Aisha",
    content: "Completed the new dashboard feature!",
    likes: 4,
    comments: ["Great job!", "Amazing work 👏"]
  },
  {
    id: 2,
    author: "Rahul",
    content: "Resolved 12 support tickets today 💪",
    likes: 2,
    comments: []
  }
];

const BragFeed = () => {
  const [brags, setBrags] = useState(mockBrags);

  const handleLike = (id) => {
    setBrags(brags.map(brag =>
      brag.id === id
        ? { ...brag, likes: brag.likes + 1 }
        : brag
    ));
  };

  return (
    <div className="space-y-6 mt-8">
      {brags.map(brag => (
        <div key={brag.id} className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-semibold text-darkText">{brag.author}</h4>
          <p className="text-lightText mt-2">{brag.content}</p>

          <div className="flex gap-6 mt-4 text-sm text-softBrown font-medium">
            <button onClick={() => handleLike(brag.id)}>
              ❤️ {brag.likes}
            </button>
            <span>💬 {brag.comments.length}</span>
          </div>

          {brag.comments.length > 0 && (
            <div className="mt-4 text-sm text-darkText">
              {brag.comments.map((c, index) => (
                <p key={index}>• {c}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BragFeed;