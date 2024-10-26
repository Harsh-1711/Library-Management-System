import React from 'react'; 
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import '../assets/css/Analytics.css';  // Add your CSS file here

const data = [
  { name: 'Jan', users: 120, booksBorrowed: 300 },
  { name: 'Feb', users: 200, booksBorrowed: 400 },
  { name: 'Mar', users: 150, booksBorrowed: 350 },
  { name: 'Apr', users: 180, booksBorrowed: 420 },
  { name: 'May', users: 240, booksBorrowed: 500 },
];

const genreData = [
  { name: 'Fiction', value: 400 },
  { name: 'Non-Fiction', value: 300 },
  { name: 'Science', value: 200 },
  { name: 'History', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <div className="analytics-section">
      <h2>Library Analytics</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>540</p>
        </div>
        <div className="card">
          <h3>Total Books</h3>
          <p>1500</p>
        </div>
        <div className="card">
          <h3>Books Borrowed</h3>
          <p>600</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <p>240</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        {/* Users Logged In Line Chart */}
        <div className="chart">
          <h3>Users Over Time</h3>
          <LineChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Books Borrowed Bar Chart */}
        <div className="chart">
          <h3>Books Borrowed</h3>
          <BarChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="booksBorrowed" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Book Genres Pie Chart */}
        <div className="chart">
          <h3>Popular Genres</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={genreData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {genreData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
