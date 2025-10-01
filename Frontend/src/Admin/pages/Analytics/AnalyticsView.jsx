import React from 'react'

import { 
    BarChart3, 
    Users, 
    ShoppingBag, 
    TrendingUp, 
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Package,
    Eye
  } from 'lucide-react';

function AnalyticsView() {

    // Mock data for demonstration
  const stats = [
    { title: "Total Sales", value: "$48,234", change: "+12.5%", isPositive: true },
    { title: "Active Users", value: "2,453", change: "+8.2%", isPositive: true },
    { title: "Conversion Rate", value: "3.8%", change: "-2.4%", isPositive: false },
    { title: "Avg. Order Value", value: "$156", change: "+6.3%", isPositive: true }
  ];


  return (

    <>


    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
    {/* Main Container */}
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-1">Track your business performance</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600/20 rounded-lg hover:bg-indigo-600/30 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

 {/* Stats Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-600/20 rounded-lg">
                  {index === 0 ? <DollarSign className="h-6 w-6 text-indigo-400" /> :
                   index === 1 ? <Users className="h-6 w-6 text-indigo-400" /> :
                   index === 2 ? <TrendingUp className="h-6 w-6 text-indigo-400" /> :
                   <ShoppingBag className="h-6 w-6 text-indigo-400" />}
                </div>
                <span className={`flex items-center text-sm ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.isPositive ? 
                    <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                    <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>


 {/* Charts Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Overview */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-indigo-400 mr-2" />
                <h3 className="text-white font-semibold">Sales Overview</h3>
              </div>
              <select className="bg-slate-800 text-slate-300 text-sm rounded-lg px-3 py-1.5 border border-white/10">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between px-2">
  {[40, 70, 45, 90, 65, 55, 80].map((height, i) => {
    return (
      <div
        key={i}
        className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg"
        style={{ height: `${height}%` }}
      ></div>
    );
  })}
</div>
            <div className="flex justify-between mt-4 text-sm text-slate-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>





            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-indigo-400 mr-2" />
                <h3 className="text-white font-semibold">Recent Activity</h3>
              </div>
              <button className="text-slate-400 hover:text-white text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { icon: Package, text: "New order #1234 from John Doe", time: "2 min ago" },
                { icon: Users, text: "New customer registration", time: "15 min ago" },
                { icon: Eye, text: "Product page view spike", time: "1 hour ago" },
                { icon: DollarSign, text: "Large transaction completed", time: "3 hours ago" }
              ].map((item, i) => (
                <div key={i} className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-indigo-600/20 rounded-lg mr-3">
                    <item.icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-200 text-sm">{item.text}</p>
                    <p className="text-slate-500 text-xs mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>



      </>
  )
}

export default AnalyticsView