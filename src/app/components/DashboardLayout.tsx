import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  Database,
  Brain,
  Sliders,
  FlaskConical,
  BarChart3,
  Package,
  Settings,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/datasets", label: "Datasets", icon: Database },
  { path: "/model-training", label: "Model Training", icon: Brain },
  { path: "/hyperparameter-tuning", label: "Hyperparameter Tuning", icon: Sliders },
  { path: "/experiments", label: "Experiments", icon: FlaskConical },
  { path: "/visualizations", label: "Visualizations", icon: BarChart3 },
  { path: "/model-registry", label: "Model Registry", icon: Package },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg">ML Platform</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : ""}`} />
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
