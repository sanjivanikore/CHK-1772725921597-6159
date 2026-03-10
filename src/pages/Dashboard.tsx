import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Leaf, Recycle, AlertTriangle, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

// Demo data for the dashboard
const weeklyData = [
  { day: "Mon", biodegradable: 12, recyclable: 8, hazardous: 2 },
  { day: "Tue", biodegradable: 15, recyclable: 10, hazardous: 1 },
  { day: "Wed", biodegradable: 9, recyclable: 14, hazardous: 3 },
  { day: "Thu", biodegradable: 18, recyclable: 7, hazardous: 0 },
  { day: "Fri", biodegradable: 11, recyclable: 13, hazardous: 4 },
  { day: "Sat", biodegradable: 20, recyclable: 9, hazardous: 2 },
  { day: "Sun", biodegradable: 14, recyclable: 11, hazardous: 1 },
];

const pieData = [
  { name: "Biodegradable", value: 99 },
  { name: "Recyclable", value: 72 },
  { name: "Hazardous", value: 13 },
];

const PIE_COLORS = [
  "hsl(142, 60%, 40%)",
  "hsl(210, 70%, 50%)",
  "hsl(30, 90%, 50%)",
];

const Dashboard = () => {
  const totalDetections = pieData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Eye className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-mono font-bold text-foreground tracking-tight">
              EcoVision
            </h1>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2 font-mono text-xs">
              <Eye className="w-3.5 h-3.5" />
              Live Detection
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 max-w-5xl">
        <h2 className="font-mono text-lg font-semibold text-foreground">
          Classification Dashboard
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total", value: totalDetections, icon: TrendingUp, color: "text-primary" },
            { label: "Bio", value: 99, icon: Leaf, color: "text-eco-bio" },
            { label: "Recycle", value: 72, icon: Recycle, color: "text-eco-recycle" },
            { label: "Hazard", value: 13, icon: AlertTriangle, color: "text-eco-hazard" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-4 pb-4 px-4 flex items-center gap-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase">{s.label}</p>
                  <p className={`text-2xl font-mono font-bold ${s.color}`}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                Weekly Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fontFamily: "monospace" }} />
                  <YAxis tick={{ fontSize: 12, fontFamily: "monospace" }} />
                  <Tooltip />
                  <Bar dataKey="biodegradable" fill="hsl(142, 60%, 40%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="recyclable" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hazardous" fill="hsl(30, 90%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(v) => <span style={{ fontFamily: "monospace", fontSize: 12 }}>{v}</span>}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Hazardous Alerts */}
        <Card className="border-eco-hazard/30">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-eco-hazard flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Recent Hazardous Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Battery detected — 92% confidence", "Chemical container — 87% confidence", "E-waste fragment — 78% confidence"].map((alert, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-md bg-eco-hazard/10 border border-eco-hazard/20"
              >
                <AlertTriangle className="w-4 h-4 text-eco-hazard" />
                <span className="font-mono text-sm text-foreground">{alert}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
