import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar />

      <main
        className="
          flex-1
          overflow-y-auto
          p-8
        "
      >

        <TopBar />

        {children}

      </main>

    </div>
  );
}