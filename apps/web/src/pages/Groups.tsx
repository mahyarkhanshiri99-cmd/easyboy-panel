import DashboardLayout from "../components/layout/DashboardLayout";
import { Users, Bot, ShieldCheck, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/client";

type Group = {
  _id: string;
  name: string;
  chatId: string;
  members: number;
  status: string;
  botStatus: string;
};

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchGroups = () => {
    setLoading(true);
    api.get("/groups")
      .then(res => {
        setGroups(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("این گروه از لیست حذف شود؟")) return;

    api.delete(`/groups/${id}`)
      .then(() => {
        setGroups(prev => prev.filter(g => g._id !== id));
      })
      .catch(err => console.log(err));
  };

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            placeholder="جستجوی گروه..."
            className="
              bg-transparent
              text-white
              placeholder-white/40
              outline-none
            "
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
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
          <option className="bg-neutral-900" value="All">همه وضعیت‌ها</option>
          <option className="bg-neutral-900" value="Active">Active</option>
          <option className="bg-neutral-900" value="Disabled">Disabled</option>
        </select>
      </div>

      <div className="mt-8 space-y-5">
        {loading && (
          <p className="text-white/50">در حال بارگذاری...</p>
        )}

        {!loading && filteredGroups.length === 0 && (
          <p className="text-white/50">گروهی یافت نشد. ربات رو به یک گروه اضافه کن تا اینجا نمایش داده بشه.</p>
        )}

        {filteredGroups.map((group) => (
          <div
            key={group._id}
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
                  {group.members.toLocaleString()} members
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
                {group.botStatus}
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

              <button
                onClick={() => handleDelete(group._id)}
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