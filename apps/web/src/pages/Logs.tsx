import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../api/client";
import { Activity } from "lucide-react";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/logs")
      .then(res => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Activity /> System Logs
        </h1>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          {loading ? (
            <p className="text-white/50 animate-pulse">Loading logs from MongoDB...</p>
          ) : (
            <div className="space-y-4">
              {logs.map((log: any) => (
                <div key={log._id} className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                  <Activity className="text-blue-400 mt-1" size={20} />
                  <div>
                    <p className="text-white font-medium">{log.action}</p>
                    <p className="text-white/60 text-sm mt-1">{log.details}</p>
                    <p className="text-white/30 text-xs mt-2">
                      {new Date(log.createdAt).toLocaleString('fa-IR')} • User ID: {log.userId || "System"}
                    </p>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <p className="text-center text-white/50">No logs found in database.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}