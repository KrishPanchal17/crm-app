import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, ArcElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(LineElement, BarElement, ArcElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// Predefined color palette to avoid duplicates
const COLOR_PALETTE = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#4B5563', // Gray
  '#14B8A6', // Teal
];

function Dashboard() {
  const products = useSelector(state => state.products.products);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);

  console.log('Dashboard: status=', status, 'products=', products, 'error=', error);

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="flex justify-center items-center h-screen text-red-400">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="flex justify-center items-center h-screen text-white">No products available.</div>;
  }

  // Assign unique colors based on product index
  const salesData = products.map((product, index) => ({
    id: product.id,
    title: product.title,
    monthlySales: Array.from({ length: 6 }, () => Math.floor(Math.random() * 500)),
    totalSales: Math.floor(Math.random() * 2000) + 500,
    color: COLOR_PALETTE[index % COLOR_PALETTE.length], // Cycle through palette
  }));

  // Line Graph: Sales trends per product
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: salesData.map(product => ({
      label: product.title,
      data: product.monthlySales,
      borderColor: product.color,
      tension: 0.4,
    })),
  };

  // Bar Graph: Total sales per product
  const barData = {
    labels: salesData.map(product => product.title),
    datasets: [{
      label: 'Total Sales',
      data: salesData.map(product => product.totalSales),
      backgroundColor: salesData.map(product => product.color),
    }],
  };

  // Pie Chart: Sales distribution
  const pieData = {
    labels: salesData.map(product => product.title),
    datasets: [{
      data: salesData.map(product => product.totalSales),
      backgroundColor: salesData.map(product => product.color),
    }],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">Monthly Sales Trends</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { labels: { color: 'white' } } }, scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } } }} />
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">Total Sales per Product</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { labels: { color: 'white' } } }, scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } } }} />
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg lg:col-span-2">
          <h3 className="text-2xl font-semibold text-white mb-4">Sales Distribution</h3>
          <div className="max-w-md mx-auto">
            <Pie data={pieData} options={{ responsive: true, plugins: { legend: { labels: { color: 'white' } } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;