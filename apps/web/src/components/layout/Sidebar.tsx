import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Activity,
  Server,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
  },
  {
    title: "Groups",
    icon: MessageSquare,
    path: "/groups",
  },
  {
    title: "Servers",
    icon: Server,
    path: "/servers",
  },
  {
    title: "Logs",
    icon: Activity,
    path: "/logs",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        h-screen
        w-72
        shrink-0
        border-r
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          🚀 EasyBoy
        </h1>

        <p className="mt-2 text-sm text-white/50">
          Admin Panel
        </p>
      </div>

      <nav className="space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
}