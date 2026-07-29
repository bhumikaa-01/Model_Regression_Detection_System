import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      <Sidebar />

      <div className="ml-72">

        <Header />

        <main
          className="min-h-[calc(100vh-80px)] p-8"
          style={{
            background: "var(--bg-primary)",
          }}
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}