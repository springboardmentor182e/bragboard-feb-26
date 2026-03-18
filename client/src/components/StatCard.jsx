export default function StatCard({title,value,subtitle,color}){

  const styles={
    yellow:"bg-yellow-50 border-yellow-300",
    blue:"bg-blue-50 border-blue-300",
    green:"bg-green-50 border-green-300"
  }

  return(

    <div className={`p-6 rounded-xl border ${styles[color]}`}>

      <p className="text-gray-600 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        {subtitle}
      </p>

    </div>

  )

}