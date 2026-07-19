import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="ml-72">
        <Header />

        <main className="min-h-[calc(100vh-80px)] bg-slate-950 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}