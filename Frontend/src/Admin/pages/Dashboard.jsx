import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Activity,
  Users,
  ShoppingBag,
  ArrowUpRight,
  Inbox,
  BarChart3,
  Package,
  Eye,
  DollarSign,
} from 'lucide-react';
import { MainContext } from '../../Context/Context';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const { API_BASE_URL } = useContext(MainContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/order/get-orders`);
        if (response.data.status === 1) {
          const allOrders = response.data.Orders;
          setOrders(allOrders);
          setTotalSales(allOrders.reduce((sum, o) => sum + Number(o.order_total), 0));
          setTotalUsers(new Set(allOrders.map(o => o.user_id?._id)).size);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_BASE_URL]);

  const barHeights = [40, 70, 45, 90, 65, 55, 80];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const activities = [
    { icon: Package, text: "New order #1234 from John Doe", time: "2 min ago" },
    { icon: Users, text: "New customer registration", time: "15 min ago" },
    { icon: Eye, text: "Product page view spike", time: "1 hour ago" },
    { icon: DollarSign, text: "Large transaction completed", time: "3 hours ago" },
  ];

  return (
    <main className="flex-1 p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Welcome Message */}
        <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome back, Admin</h1>
          <p className="mt-2 text-white/70">Here’s what’s happening in your store today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Sales" value={`Rs. ${totalSales}`} icon={<Activity />} color="blue" percent="12%" />
          <StatCard title="Total Users" value={totalUsers} icon={<Users />} color="purple" percent="8%" />
          <StatCard title="Active Products" value="384" icon={<ShoppingBag />} color="amber" percent="4%" />
          <StatCard title="Recent Orders" value={orders.length} icon={<ShoppingBag />} color="emerald" percent="16%" />
        </div>

        {/* Graph & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
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
              {barHeights.map((height, i) => (
                <div
                  key={i}
                  className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg"
                  style={{ height: `${height}%` }}
                  title={`${days[i]}: ${height}%`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-slate-400">
              {days.map(day => <span key={day}>{day}</span>)}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-indigo-400 mr-2" />
                <h3 className="text-white font-semibold">Recent Activity</h3>
              </div>
              <button className="text-slate-400 hover:text-white text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {activities.map((item, i) => (
                <div key={i} className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-indigo-600/20 rounded-lg mr-3">
                    <item.icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-slate-200 text-sm">{item.text}</p>
                    <p className="text-slate-500 text-xs mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Orders</h2>
          {loading ? (
            <p className="text-white/70">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/70">
              <Inbox className="w-12 h-12 mb-4" />
              <p className="text-lg font-semibold">No orders found.</p>
              <p className="text-sm mt-1">You have no recent orders at the moment.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-white text-sm">
                <thead>
                  <tr className="text-left border-b border-white/20">
                    <th className="py-3 pr-6">Order ID</th>
                    <th className="py-3 pr-6">User Name</th>
                    <th className="py-3 pr-6">Order Total</th>
                    <th className="py-3 pr-6">Create Date</th>
                    <th className="py-3">Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                      <td className="py-3 pr-6">{order._id}</td>
                      <td className="py-3 pr-6">{order.user_id?.name || 'Unknown'}</td>
                      <td className="py-3 pr-6">Rs. {order.order_total}</td>
                      <td className="py-3 pr-6">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="py-3">{Number(order.payment_mode) === 0 ? 'COD' : 'Online'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, color, percent }) {
  const colorMap = {
    blue: 'text-blue-500 bg-blue-500/20',
    purple: 'text-purple-500 bg-purple-500/20',
    amber: 'text-amber-500 bg-amber-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/20',
  };

  return (
    <div className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          <div className="flex items-center mt-2 text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm ml-1">{percent} up</span>
          </div>
        </div>
        <div className={`${colorMap[color]} p-3 rounded-lg`}>
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
