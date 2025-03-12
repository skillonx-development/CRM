import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', performance: 75 },
  { name: 'Feb', performance: 85 },
  { name: 'Mar', performance: 80 },
  { name: 'April', performance: 60 },
  { name: 'May', performance: 50 },
  { name: 'June', performance: 65 },
  { name: 'July', performance: 70 },
];

export default function ProjectPerformance() {
  return (
    <div className="bg-background-card rounded-2xl shadow-card p-6">
      <h2 className="text-white text-lg font-semibold mb-4">Team Performance</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', color: '#fff' }} 
            cursor={{ fill: '#1f293733' }} 
          />
          <Bar dataKey="performance" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
