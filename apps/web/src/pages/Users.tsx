import DashboardLayout from "../components/layout/DashboardLayout";
import { Shield, UserCheck, UserX, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/client";

type User = {
  _id: string;
  name: string;
  username: string;
  role: string;
  status: string;
  telegramId: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    api.get("/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("این کاربر حذف شود؟")) return;

    api.delete(`/users/${id}`)
      .then(() => {
        setUsers(prev => prev.filter(u => u._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleToggleRole = (id: string) => {
    api.patch(`/users/${id}/role`)
      .then(res => {
        setUsers(prev =>
          prev.map(u => (u._id === id ? res.data : u))
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white">
        Users 👥
      </h1>
      <p className="mt-2 text-white/50">
        Manage EasyBoy users
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-white/10
          px-4
          py-3
          backdrop-blur-xl
        ">
          <Search size={18} className="text-white/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی کاربر..."
            className="
              bg-transparent
              text-white
              placeholder-white/40
              outline-none
            "
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/10
            px-4
            py-3
            text-white
            backdrop-blur-xl
            outline-none
          "
        >
          <option className="bg-neutral-900" value="All">همه نقش‌ها</option>
          <option className="bg-neutral-900" value="Admin">Admin</option>
          <option className="bg-neutral-900" value="User">User</option>
        </select>
      </div>

      <div className="mt-8 space-y-4">
        {loading && (
          <p className="text-white/50">در حال بارگذاری...</p>
        )}

        {!loading && filteredUsers.length === 0 && (
          <p className="text-white/50">کاربری یافت نشد</p>
        )}

        {filteredUsers.map((user) => (
          <div
            key={user._id}
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
            <div className="flex items-center gap-4">
              <div className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white/10
              ">
                <Shield className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user.name}
                </h2>
                <p className="text-white/50">
                  {user.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`
                rounded-full
                px-4
                py-2
                ${user.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"}
              `}>
                {user.status}
              </span>

              <span className="
                rounded-full
                bg-blue-500/20
                px-4
                py-2
                text-blue-400
              ">
                {user.role}
              </span>

              <button
                onClick={() => handleToggleRole(user._id)}
                className="
                  rounded-xl
                  bg-white/10
                  p-3
                  text-white
                "
              >
                {
                  user.role === "Admin"
                    ? <UserX size={20} />
                    : <UserCheck size={20} />
                }
              </button>

              <button
                onClick={() => handleDelete(user._id)}
                className="
                  rounded-xl
                  bg-red-500/20
                  p-3
                  text-red-400
                "
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}