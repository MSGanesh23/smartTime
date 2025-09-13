import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Settings, 
  Bot, 
  FileText, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'faculty' | 'student';
}

export default function Layout({ children, userRole = 'admin' }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const adminNavItems = [
    { icon: Calendar, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Users, label: 'Faculty', path: '/faculty' },
    { icon: Settings, label: 'Classrooms', path: '/classrooms' },
    { icon: Bot, label: 'AI Timetable', path: '/generate' },
    { icon: FileText, label: 'View Timetables', path: '/timetables' },
  ];

  const facultyNavItems = [
    { icon: Calendar, label: 'My Schedule', path: '/schedule' },
    { icon: FileText, label: 'Timetables', path: '/timetables' },
  ];

  const studentNavItems = [
    { icon: Calendar, label: 'My Timetable', path: '/timetable' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : 
                   userRole === 'faculty' ? facultyNavItems : studentNavItems;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card shadow-elegant"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-elegant z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EduSchedule</h1>
              <p className="text-sm text-muted-foreground">AI Timetable System</p>
            </div>
          </div>

          {/* User role badge */}
          <div className="mb-6 p-3 bg-accent rounded-lg">
            <div className="text-sm font-medium text-accent-foreground capitalize">
              {userRole} Portal
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${isActive ? 'shadow-sm' : ''}`}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}