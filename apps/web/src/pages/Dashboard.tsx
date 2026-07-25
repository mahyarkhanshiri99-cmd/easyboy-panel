import {
  Users,
  MessageSquare,
  Activity,
  Bot
} from "lucide-react";

import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import api from "../api/client";


export default function Dashboard() {

  const [stats,setStats] = useState({
    users:0,
    groups:0,
    messages:"0",
    bot:"offline"
  });


  useEffect(()=>{

    api.get("/stats")
    .then(res=>{

      setStats(res.data);

    })
    .catch(err=>{

      console.log(err);

    });

  },[]);



  return (

    <DashboardLayout>


      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Dashboard 🚀
          </h1>

          <p className="mt-2 text-white/50">
            EasyBoy Control Center
          </p>

        </div>


        <div className="
        rounded-2xl
        border
        border-white/10
        bg-white/10
        px-5
        py-3
        text-green-400
        backdrop-blur-xl
        ">

          🟢 {stats.bot}

        </div>

      </div>




      <div className="
      mt-10
      grid
      gap-6
      md:grid-cols-2
      xl:grid-cols-4
      ">


        <StatCard
          title="Total Users"
          value={stats.users.toString()}
          icon={<Users />}
        />


        <StatCard
          title="Groups"
          value={stats.groups.toString()}
          icon={<MessageSquare />}
        />


        <StatCard
          title="Messages Today"
          value={stats.messages}
          icon={<Activity />}
        />


        <StatCard
          title="Bot Status"
          value={stats.bot}
          status="Connected"
          icon={<Bot />}
        />


      </div>



    </DashboardLayout>

  );

}