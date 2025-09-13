import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  MapPin, 
  Calendar, 
  Bot, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Courses',
      value: '156',
      change: '+12 this semester',
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Faculty Members',
      value: '89',
      change: '+5 new hires',
      icon: Users,
      color: 'text-secondary-accent'
    },
    {
      title: 'Classrooms',
      value: '45',
      change: '3 smart rooms added',
      icon: MapPin,
      color: 'text-success'
    },
    {
      title: 'Generated Timetables',
      value: '12',
      change: 'Last updated today',
      icon: Calendar,
      color: 'text-info'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'success',
      message: 'Computer Science timetable generated successfully',
      time: '2 hours ago',
      icon: CheckCircle2
    },
    {
      id: 2,
      type: 'warning',
      message: 'Conflict detected in Mathematics department',
      time: '4 hours ago',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'info',
      message: 'New faculty member added to Physics department',
      time: '1 day ago',
      icon: Users
    },
    {
      id: 4,
      type: 'success',
      message: 'Classroom allocation optimized for Block A',
      time: '2 days ago',
      icon: MapPin
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your timetable management system.
            </p>
          </div>
          <Button className="shadow-sm">
            <Bot className="h-4 w-4 mr-2" />
            Generate New Timetable
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm border-border hover:shadow-elegant transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Generation Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elegant border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Timetable Generation Status
                </CardTitle>
                <CardDescription>
                  Current progress of automated scheduling processes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Computer Science Department</span>
                      <span className="text-success">Completed</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mathematics Department</span>
                      <span className="text-warning">Resolving Conflicts</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Physics Department</span>
                      <span className="text-info">In Progress</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Optimization Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Frequently used operations for efficient management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" size="sm" className="h-auto py-3 flex flex-col gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs">Add Course</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex flex-col gap-2">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Add Faculty</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex flex-col gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-xs">Add Room</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-3 flex flex-col gap-2">
                    <Bot className="h-5 w-5" />
                    <span className="text-xs">AI Generate</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="shadow-sm border-border">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'success' ? 'bg-success/10' :
                      activity.type === 'warning' ? 'bg-warning/10' :
                      'bg-info/10'
                    }`}>
                      <activity.icon className={`h-4 w-4 ${
                        activity.type === 'success' ? 'text-success' :
                        activity.type === 'warning' ? 'text-warning' :
                        'text-info'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}