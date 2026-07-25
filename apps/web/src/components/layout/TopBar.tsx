import { Bell, Search, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        mb-8
        flex
        items-center
        justify-between
        rounded-3xl
        border
        border-white/10
        bg-white/10
        px-6
        py-4
        backdrop-blur-xl
      "
    >
      <div>
        <h2 className="text-2xl font-bold text-white">
          EasyBoy Panel
        </h2>

        <p className="text-sm text-white/50">
          Professional Telegram Control Center
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-white/10
            px-4
            py-2
          "
        >
          <Search size={18} className="text-white/50" />

          <input
            placeholder="Search..."
            className="
              w-48
              bg-transparent
              text-white
              outline-none
              placeholder:text-white/40
            "
          />
        </div>

        <button
          className="
            rounded-xl
            bg-white/10
            p-3
            text-white
            transition
            hover:bg-white/20
          "
        >
          <Bell size={20} />
        </button>

        <div
          className="
            rounded-full
            bg-green-500/20
            px-4
            py-2
            text-sm
            font-semibold
            text-green-400
          "
        >
          🟢 Online
        </div>

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              font-bold
              text-white
            "
          >
            A
          </div>

          <div>
            <div className="font-semibold text-white">
              Admin
            </div>

            <div className="text-xs text-white/50">
              Super Administrator
            </div>
          </div>

        </div>

        <button
          className="
            rounded-xl
            bg-red-500/20
            p-3
            text-red-400
            transition
            hover:bg-red-500/30
          "
        >
          <LogOut size={20} />
        </button>

      </div>
    </motion.header>
  );
}