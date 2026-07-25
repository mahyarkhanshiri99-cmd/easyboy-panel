import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Server,
  Database,
  Cpu,
  Activity,
  Wifi
} from "lucide-react";

import api from "../api/client";



type ServerType = {

  name:string;
  type:string;
  status:string;
  location:string;
  uptime:string;

};



export default function Servers(){


const [servers,setServers] = useState<ServerType[]>([]);


const [loading,setLoading] = useState(true);



useEffect(()=>{


    api.get("/servers/status")

    .then((res)=>{

        setServers(res.data.servers);

    })

    .catch((err)=>{

        console.log(err);

    })

    .finally(()=>{

        setLoading(false);

    });


},[]);




return (

<DashboardLayout>


<h1 className="text-4xl font-bold text-white">

Servers 🖥️

</h1>


<p className="mt-2 text-white/50">

Real time EasyBoy services status

</p>





{
loading ?

<p className="mt-10 text-white">
Loading servers...
</p>


:


<div className="
mt-8
grid
gap-6
md:grid-cols-2
lg:grid-cols-3
">


{

servers.map((server)=>(


<div

key={server.name}

className="
rounded-3xl
border
border-white/10
bg-white/10
p-6
backdrop-blur-xl
"


>



<div className="
flex
items-center
justify-between
">


<div className="
flex
items-center
gap-3
">


<div className="
rounded-2xl
bg-white/10
p-3
">


{

server.type==="Database"

?

<Database className="text-white"/>

:

<Server className="text-white"/>

}


</div>




<div>

<h2 className="font-bold text-white">

{server.name}

</h2>


<p className="text-sm text-white/50">

{server.type}

</p>


</div>



</div>





<span className="
rounded-full
bg-green-500/20
px-3
py-1
text-green-400
">

{server.status}

</span>



</div>





<div className="
mt-6
space-y-3
">


<div className="
rounded-xl
bg-white/5
p-3
text-white
">


Location:
{" "}
{server.location}


</div>



<div className="
flex
justify-between
rounded-xl
bg-white/5
p-3
">


<span className="flex gap-2 text-white/50">

<Cpu size={18}/>

Status

</span>


<span className="text-white">

{server.uptime}

</span>



</div>




<div className="
flex
items-center
gap-2
text-green-400
">

<Wifi size={18}/>

Connection Stable

</div>



</div>



</div>


))


}


</div>


}


</DashboardLayout>

);


}