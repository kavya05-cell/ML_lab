import { Database, AlertCircle } from "lucide-react";

export function DatasetOverview() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
          <Database className="w-5 h-5 text-cyan-400" />
        </div>
        <h2 className="text-xl font-semibold">Dataset Overview</h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Dataset Name</p>
          <p className="font-medium">Customer Churn Prediction</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Rows</p>
            <p className="text-2xl font-bold text-cyan-400">10,000</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Features</p>
            <p className="text-2xl font-bold text-purple-400">24</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Missing</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-orange-400">3.2%</p>
              <AlertCircle className="w-4 h-4 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-2">Dataset Quality</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full w-[87%]"></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">87% Complete</p>
        </div>
      </div>
    </div>
  );
}
