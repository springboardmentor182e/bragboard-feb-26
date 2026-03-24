export default function TopPerformer({data,rank}){

  const bg={
    1:"bg-yellow-50",
    2:"bg-gray-100",
    3:"bg-orange-50"
  }

  const medal={
    1:"🏆",
    2:"🥈",
    3:"🥉"
  }

  return(

    <div className={`p-8 rounded-xl text-center ${bg[rank]} w-72`}>

      <div className="w-12 h-12 mx-auto rounded-full bg-white shadow flex items-center justify-center text-lg">

        {medal[rank]}

      </div>

      <h3 className="font-semibold mt-4 text-gray-800">
        {data.name}
      </h3>

      <p className="text-purple-600 text-2xl font-bold mt-1">
        {data.points}
      </p>

      <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">

        {data.department}

      </span>

      <p className="text-gray-500 text-sm mt-2">
        {data.badges} badges
      </p>

    </div>

  )

}