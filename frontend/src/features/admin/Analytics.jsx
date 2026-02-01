import {
    BanknotesIcon,
    ChatBubbleLeftRightIcon,
    CubeTransparentIcon,
    ShoppingBagIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    Tooltip,
    XAxis, YAxis,
} from "recharts";
import { getSystemStats } from "./adminAPI";

const COLORS = ["#0f3828", "#f97316", "#4b5563", "#9ca3af"];

const IconCard = ({ title, count, icon: Icon, color }) => (
  <div className="p-6 rounded-3xl shadow-xl bg-white border border-secondary/10 transition hover:scale-[1.02]">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color === 'text-primary' ? 'bg-primary/10' : 'bg-secondary/10'}`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-serif font-bold text-secondary">{count}</h3>
      </div>
    </div>
  </div>
);

const UserRoleChart = ({ data }) => (
  <PieChart width={300} height={300}>
    <Pie data={data} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip 
      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
    />
    <Legend />
  </PieChart>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white border border-secondary/10 p-8 rounded-3xl shadow-xl">
    <h4 className="text-xl font-serif font-bold text-secondary mb-6">{title}</h4>
    <div className="flex justify-center">
      {children}
    </div>
  </div>
);

const Analytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getSystemStats();
        setStats(data);
      } catch {
        toast.error("Could not fetch stats");
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">📊</span>
          <h2 className="text-3xl font-serif font-bold text-secondary">Admin Analytics Dashboard</h2>
        </div>

        {!stats ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-8">
              <IconCard title="Total Users" count={stats.userCount} icon={UserIcon} color="text-secondary" />
              <IconCard title="Plants" count={stats.plantCount} icon={CubeTransparentIcon} color="text-primary" />
              <IconCard title="Community Posts" count={stats.postCount} icon={ChatBubbleLeftRightIcon} color="text-secondary" />
              <IconCard title="Orders" count={stats.totalOrders} icon={ShoppingBagIcon} color="text-primary" />
              <IconCard title="Revenue" count={`₹${stats.totalRevenue}`} icon={BanknotesIcon} color="text-secondary" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {stats.roleCounts && (
                <ChartBox title="User Roles Distribution">
                  <UserRoleChart data={stats.roleCounts} />
                </ChartBox>
              )}
              {stats.ordersPerDay && (
                <ChartBox title="Orders in Last 7 Days">
                  <BarChart width={400} height={300} data={stats.ordersPerDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="_id" stroke="#0f3828" />
                    <YAxis stroke="#0f3828" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartBox>
              )}
              {stats.revenuePerDay && (
                <ChartBox title="Revenue in Last 7 Days">
                  <LineChart width={400} height={300} data={stats.revenuePerDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="_id" stroke="#0f3828" />
                    <YAxis stroke="#0f3828" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Line type="monotone" dataKey="total" stroke="#0f3828" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} />
                  </LineChart>
                </ChartBox>
              )}
              {stats.recentUserActivity && (
                <ChartBox title="New Users in Last 7 Days">
                  <LineChart width={400} height={300} data={stats.recentUserActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="_id" stroke="#0f3828" />
                    <YAxis stroke="#0f3828" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#0f3828' }} />
                  </LineChart>
                </ChartBox>
              )}
              {stats.recentPostActivity && (
                <ChartBox title="Posts in Last 7 Days">
                  <BarChart width={400} height={300} data={stats.recentPostActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="_id" stroke="#0f3828" />
                    <YAxis stroke="#0f3828" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#0f3828" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartBox>
              )}
            </div>

            {/* Tables */}
            <div className="grid md:grid-cols-2 gap-6">
              {stats.recentUsers && (
                <div className="bg-white border border-secondary/10 p-8 rounded-3xl shadow-xl">
                  <h4 className="text-xl font-serif font-bold text-secondary mb-6">Recent Users</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 font-bold uppercase tracking-wider border-b border-secondary/10">
                        <th className="pb-4">Name</th>
                        <th className="pb-4">Email</th>
                        <th className="pb-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary/10">
                      {stats.recentUsers.map((u) => (
                        <tr key={u._id}>
                          <td className="py-4 font-medium text-secondary">{u.name}</td>
                          <td className="py-4 text-gray-600">{u.email}</td>
                          <td className="py-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {stats.recentPosts && (
                <div className="bg-white border border-secondary/10 p-8 rounded-3xl shadow-xl">
                  <h4 className="text-xl font-serif font-bold text-secondary mb-6">Recent Posts</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 font-bold uppercase tracking-wider border-b border-secondary/10">
                        <th className="pb-4">Title</th>
                        <th className="pb-4">Posted On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary/10">
                      {stats.recentPosts.map((p) => (
                        <tr key={p._id}>
                          <td className="py-4 font-medium text-secondary">{p.title}</td>
                          <td className="py-4 text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {stats.topProducts && (
                <div className="bg-white border border-secondary/10 p-8 rounded-3xl shadow-xl col-span-full">
                  <h4 className="text-xl font-serif font-bold text-secondary mb-6">🔥 Top 5 Products Sold</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 font-bold uppercase tracking-wider border-b border-secondary/10">
                        <th className="pb-4">Product Name</th>
                        <th className="pb-4">Total Sold</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary/10">
                      {stats.topProducts.map((p) => (
                        <tr key={p.name}>
                          <td className="py-4 font-medium text-secondary">{p.name}</td>
                          <td className="py-4 text-primary font-bold">{p.totalSold}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
