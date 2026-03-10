import {useEffect,useState} from "react"
import StatCard from "./components/StatCard"
import TopPerformer from "./components/TopPerformer"
import Rankings from "./components/Rankings"

export default function App(){

  const [leaders,setLeaders]=useState([])
  const [top,setTop]=useState([])

  useEffect(()=>{

    fetch("http://127.0.0.1:8000/leaderboard/full")
      .then(res=>res.json())
      .then(data=>setLeaders(data))

    fetch("http://127.0.0.1:8000/leaderboard/top")
      .then(res=>res.json())
      .then(data=>setTop(data))

  },[])

  const totalBadges=leaders.reduce((a,b)=>a+(b.badges||0),0)

  return(

    <div className="bg-gray-100 min-h-screen p-12">

      <h1 className="text-3xl font-bold">
        Leaderboard
      </h1>

      <p className="text-gray-500 mb-8">
        Top performers based on recognition and engagement
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <StatCard
          title="Top Score"
          value={top[0]?.points}
          subtitle={top[0]?.name}
          color="yellow"
        />

        <StatCard
          title="Total Badges"
          value={totalBadges}
          subtitle="Awarded this month"
          color="blue"
        />

        <StatCard
          title="Growth"
          value="+24%"
          subtitle="vs last month"
          color="green"
        />

      </div>

      <div className="bg-white rounded-xl p-8 mb-10">

        <h2 className="text-xl font-semibold mb-6">
          Top Performers
        </h2>

        <div className="flex justify-center gap-8">

          {top[1] && <TopPerformer rank={2} data={top[1]} />}
          {top[0] && <TopPerformer rank={1} data={top[0]} />}
          {top[2] && <TopPerformer rank={3} data={top[2]} />}

        </div>

      </div>

      <Rankings leaders={leaders}/>

    </div>

  )

}