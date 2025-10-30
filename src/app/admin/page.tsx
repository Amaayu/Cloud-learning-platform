"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  FileText,
  Brain,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubjects: 0,
    totalTopics: 0,
    totalQuizzes: 0,
  });
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch admin stats
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("/api/admin/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStats(data);
          }
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "subjects", label: "Subjects", icon: BookOpen },
    { id: "topics", label: "Topics", icon: FileText },
    { id: "quizzes", label: "Quizzes", icon: Brain },
    { id: "users", label: "Users", icon: Users },
  ];

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your learning platform content and users
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              color="text-blue-500"
            />
            <StatCard
              title="Total Subjects"
              value={stats.totalSubjects}
              icon={BookOpen}
              color="text-green-500"
            />
            <StatCard
              title="Total Topics"
              value={stats.totalTopics}
              icon={FileText}
              color="text-purple-500"
            />
            <StatCard
              title="Total Quizzes"
              value={stats.totalQuizzes}
              icon={Brain}
              color="text-orange-500"
            />
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>Add Subject</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Plus className="h-6 w-6" />
                  <span>Add Topic</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Plus className="h-6 w-6" />
                  <span>Create Quiz</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Users className="h-6 w-6" />
                  <span>View Users</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">
                      john.doe@example.com - 2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Topic completed</p>
                    <p className="text-xs text-muted-foreground">
                      Array Basics - DSA - 3 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Quiz attempted</p>
                    <p className="text-xs text-muted-foreground">
                      Arrays and Strings Quiz - 5 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Subjects Tab */}
      {activeTab === "subjects" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Manage Subjects</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Subjects</CardTitle>
              <CardDescription>Manage your course subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search */}
                <Input placeholder="Search subjects..." />

                {/* Subjects List */}
                <div className="space-y-2">
                  {[
                    "Data Structures & Algorithms",
                    "Database Management System",
                    "Operating Systems",
                  ].map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          6 units • 45 topics
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Other tabs would be implemented similarly */}
      {activeTab !== "overview" && activeTab !== "subjects" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-bold mb-4">
            {tabs.find((tab) => tab.id === activeTab)?.label} Management
          </h2>
          <p className="text-muted-foreground mb-6">
            This section is under development. Coming soon!
          </p>
          <Button variant="outline">Back to Overview</Button>
        </motion.div>
      )}
    </div>
  );
}
