import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto min-h-screen px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
