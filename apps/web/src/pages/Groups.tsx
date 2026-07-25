import DashboardLayout from "../components/layout/DashboardLayout";
import { Users, Bot, ShieldCheck } from "lucide-react";

const groups = [
  {
    id: 1,
    name: "EasyBoy Community",
    members: "12,540",
    status: "Active",
    bot: "Online",
  },
  {
    id: 2,
    name: "Developers Hub",
    members: "3,240",
    status: "Active",
    bot: "Online",
  },
  {
    id: 3,
    name: "Test Group",
    members: "850",
    status: "Disabled",
    bot: "Offline",
  },
];

export default function Groups() {
  return (
    <DashboardLayout>

      <div>
        <h1 className="text-4xl font-bold text-white">
          Groups 🚀
        </h1>

        <p className="mt-2 text-white/50">
          Manage Telegram groups connected to EasyBoy
        </p>
      </div>


      <div className="mt-8 space-y-5">

        {groups.map((group) => (

          <div
            key={group.id}
            className="
            flex
            items-center
            justify-between
            rounded-3xl
            border
            border-white/10
            bg-white/10
            p-6
            backdrop-blur-xl
            "
          >

            <div className="flex items-center gap-5">

              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                "
              >
                <Users className="text-white"/>
              </div>


              <div>
                <h2 className="text-xl font-bold text-white">
                  {group.name}
                </h2>

                <p className="text-white/50">
                  {group.members} members
                </p>
              </div>

            </div>


            <div className="flex items-center gap-4">


              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white/10
                px-4
                py-2
                text-white/80
                "
              >
                <Bot size={18}/>
                {group.bot}
              </div>


              <div
                className={`
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-2

                ${
                  group.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
                }
                `}
              >

                <ShieldCheck size={18}/>

                {group.status}

              </div>


            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}