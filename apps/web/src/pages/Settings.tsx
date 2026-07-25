import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Bot, Shield, Bell, Save } from "lucide-react";

export default function Settings() {

  const [botStatus, setBotStatus] = useState(true);
  const [antiSpam, setAntiSpam] = useState(true);
  const [notifications, setNotifications] = useState(true);


  return (
    <DashboardLayout>

      <div>

        <h1 className="text-4xl font-bold text-white">
          Settings ⚙️
        </h1>

        <p className="mt-2 text-white/50">
          Configure EasyBoy system
        </p>

      </div>



      <div className="mt-8 space-y-6">


        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-6
          backdrop-blur-xl
        ">

          <div className="flex items-center gap-4">

            <Bot className="text-white"/>

            <div>
              <h2 className="text-xl font-bold text-white">
                Bot Status
              </h2>

              <p className="text-white/50">
                Telegram bot connection
              </p>
            </div>


            <button
              onClick={() => setBotStatus(!botStatus)}
              className={`
                ml-auto
                rounded-xl
                px-5
                py-2
                ${
                  botStatus
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
                }
              `}
            >
              {botStatus ? "Online" : "Offline"}

            </button>

          </div>

        </div>




        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-6
          backdrop-blur-xl
        ">


          <div className="flex items-center gap-4">

            <Shield className="text-white"/>


            <div>
              <h2 className="text-xl font-bold text-white">
                Anti Spam
              </h2>

              <p className="text-white/50">
                Protect groups automatically
              </p>
            </div>



            <button
              onClick={() => setAntiSpam(!antiSpam)}
              className="
                ml-auto
                rounded-xl
                bg-blue-500/20
                px-5
                py-2
                text-blue-400
              "
            >

              {antiSpam ? "Enabled" : "Disabled"}

            </button>


          </div>


        </div>




        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-6
          backdrop-blur-xl
        ">


          <div className="flex items-center gap-4">


            <Bell className="text-white"/>


            <div>

              <h2 className="text-xl font-bold text-white">
                Notifications
              </h2>

              <p className="text-white/50">
                System alerts
              </p>

            </div>



            <button
              onClick={() => setNotifications(!notifications)}
              className="
                ml-auto
                rounded-xl
                bg-purple-500/20
                px-5
                py-2
                text-purple-400
              "
            >

              {notifications ? "Active" : "Muted"}

            </button>


          </div>


        </div>





        <button
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            px-8
            py-4
            font-bold
            text-white
            transition
            hover:scale-105
          "
        >

          <Save size={20}/>

          Save Settings

        </button>



      </div>


    </DashboardLayout>
  );
}