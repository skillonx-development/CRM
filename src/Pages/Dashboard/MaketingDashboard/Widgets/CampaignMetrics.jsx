import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", impressions: 320, clicks: 300, conversions: 350 },
  { month: "Feb", impressions: 340, clicks: 290, conversions: 360 },
  { month: "Mar", impressions: 330, clicks: 280, conversions: 370 },
  { month: "Apr", impressions: 290, clicks: 260, conversions: 350 },
  { month: "May", impressions: 310, clicks: 310, conversions: 320 },
  { month: "Jun", impressions: 360, clicks: 350, conversions: 310 },
  { month: "Jul", impressions: 390, clicks: 400, conversions: 360 },
  { month: "Aug", impressions: 370, clicks: 380, conversions: 340 },
  { month: "Sep", impressions: 350, clicks: 340, conversions: 330 },
  { month: "Oct", impressions: 330, clicks: 310, conversions: 310 },
  { month: "Nov", impressions: 310, clicks: 290, conversions: 300 },
  { month: "Dec", impressions: 290, clicks: 270, conversions: 280 },
];

const CampaignMetrics = () => {
  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card">
      <h2 className="text-xl font-semibold text-text-default mb-4">
        Campaigns Metrics
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#374151" }} />
          <Line type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={2} />
          <Line type="monotone" dataKey="clicks" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-4">
        <span className="flex items-center text-text-muted">
          <span className="w-3 h-3 bg-chart-purple inline-block mr-2"></span> Impressions
        </span>
        <span className="flex items-center text-text-muted">
          <span className="w-3 h-3 bg-chart-red inline-block mr-2"></span> Clicks
        </span>
        <span className="flex items-center text-text-muted">
          <span className="w-3 h-3 bg-chart-green inline-block mr-2"></span> Conversions
        </span>
      </div>
    </div>
  );
};

export default CampaignMetrics;
