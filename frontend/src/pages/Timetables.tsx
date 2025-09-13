import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Download, 
  Share, 
  Filter, 
  Clock,
  MapPin,
  Users,
  BookOpen,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function Timetables() {
  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timetableData = {
    'Monday': {
      '09:00 - 10:00': { course: 'CS101', room: 'Lab A1', faculty: 'Dr. Sarah Johnson', conflict: false },
      '10:00 - 11:00': { course: 'MATH201', room: 'Room B2', faculty: 'Prof. Michael Chen', conflict: false },
      '14:00 - 15:00': { course: 'PHY301', room: 'Lab C3', faculty: 'Dr. Robert Kim', conflict: false },
      '15:00 - 16:00': { course: 'ENG105', room: 'Room D1', faculty: 'Dr. Emily Rodriguez', conflict: true }
    },
    'Tuesday': {
      '08:00 - 09:00': { course: 'BIO201', room: 'Bio Lab', faculty: 'Dr. Lisa Wang', conflict: false },
      '11:00 - 12:00': { course: 'CS101', room: 'Lab A1', faculty: 'Dr. Sarah Johnson', conflict: false },
      '13:00 - 14:00': { course: 'MATH201', room: 'Room B2', faculty: 'Prof. Michael Chen', conflict: false },
      '16:00 - 17:00': { course: 'PHY301', room: 'Lab C3', faculty: 'Dr. Robert Kim', conflict: false }
    },
    'Wednesday': {
      '09:00 - 10:00': { course: 'ENG105', room: 'Room D1', faculty: 'Dr. Emily Rodriguez', conflict: false },
      '12:00 - 13:00': { course: 'CS101', room: 'Lab A1', faculty: 'Dr. Sarah Johnson', conflict: false },
      '14:00 - 15:00': { course: 'BIO201', room: 'Bio Lab', faculty: 'Dr. Lisa Wang', conflict: false },
      '17:00 - 18:00': { course: 'MATH201', room: 'Room B2', faculty: 'Prof. Michael Chen', conflict: true }
    },
    'Thursday': {
      '10:00 - 11:00': { course: 'PHY301', room: 'Lab C3', faculty: 'Dr. Robert Kim', conflict: false },
      '11:00 - 12:00': { course: 'CS101', room: 'Lab A1', faculty: 'Dr. Sarah Johnson', conflict: false },
      '15:00 - 16:00': { course: 'BIO201', room: 'Bio Lab', faculty: 'Dr. Lisa Wang', conflict: false },
      '16:00 - 17:00': { course: 'ENG105', room: 'Room D1', faculty: 'Dr. Emily Rodriguez', conflict: false }
    },
    'Friday': {
      '08:00 - 09:00': { course: 'MATH201', room: 'Room B2', faculty: 'Prof. Michael Chen', conflict: false },
      '13:00 - 14:00': { course: 'PHY301', room: 'Lab C3', faculty: 'Dr. Robert Kim', conflict: false },
      '14:00 - 15:00': { course: 'CS101', room: 'Lab A1', faculty: 'Dr. Sarah Johnson', conflict: false },
      '15:00 - 16:00': { course: 'BIO201', room: 'Bio Lab', faculty: 'Dr. Lisa Wang', conflict: false }
    },
    'Saturday': {
      '09:00 - 10:00': { course: 'ENG105', room: 'Room D1', faculty: 'Dr. Emily Rodriguez', conflict: false },
      '10:00 - 11:00': { course: 'CS101', room: 'Lab A1', faculty: 'Dr. Sarah Johnson', conflict: false }
    }
  };

  const conflicts = Object.values(timetableData).flatMap(day => 
    Object.values(day).filter(slot => slot.conflict)
  ).length;

  const totalSlots = Object.values(timetableData).reduce((total, day) => 
    total + Object.keys(day).length, 0
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              Timetable View
            </h1>
            <p className="text-muted-foreground">
              AI-generated schedules with conflict detection and optimization
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Department Selection and Stats */}
        <div className="grid lg:grid-cols-4 gap-6">
          <Card className="shadow-sm border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="computer-science">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{totalSlots - conflicts}</div>
                  <p className="text-sm text-muted-foreground">Scheduled Classes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{conflicts}</div>
                  <p className="text-sm text-muted-foreground">Conflicts Detected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-info" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <p className="text-sm text-muted-foreground">Efficiency Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timetable Grid */}
        <Card className="shadow-elegant border-border">
          <CardHeader>
            <CardTitle>Weekly Timetable - Computer Science Department</CardTitle>
            <CardDescription>
              Semester 1, 2024 | Generated by AI with NEP 2020 compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  <div className="p-3 font-medium text-center text-muted-foreground">
                    Time
                  </div>
                  {days.map((day) => (
                    <div key={day} className="p-3 font-medium text-center bg-accent rounded-lg">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="space-y-2">
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-7 gap-2">
                      <div className="p-3 text-sm font-medium text-center bg-muted rounded-lg flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {time}
                      </div>
                      {days.map((day) => {
                        const classInfo = timetableData[day]?.[time];
                        return (
                          <div
                            key={`${day}-${time}`}
                            className={`timetable-cell ${
                              classInfo 
                                ? classInfo.conflict 
                                  ? 'conflict border-warning/30 bg-warning/5' 
                                  : 'occupied'
                                : 'bg-card hover:bg-accent/30'
                            }`}
                          >
                            {classInfo ? (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <Badge variant={classInfo.conflict ? "destructive" : "default"} className="text-xs">
                                    {classInfo.course}
                                  </Badge>
                                  {classInfo.conflict && (
                                    <AlertTriangle className="h-3 w-3 text-warning" />
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {classInfo.room}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {classInfo.faculty.split(' ').slice(-2).join(' ')}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-muted-foreground text-xs">
                                Free
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conflict Resolution */}
        {conflicts > 0 && (
          <Card className="shadow-sm border-border border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Scheduling Conflicts Detected
              </CardTitle>
              <CardDescription>
                The following conflicts need attention and manual resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-warning/30">
                  <div>
                    <p className="font-medium">ENG105 - Monday 15:00-16:00</p>
                    <p className="text-sm text-muted-foreground">
                      Room D1 double-booked with MATH203
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-warning/30">
                  <div>
                    <p className="font-medium">MATH201 - Wednesday 17:00-18:00</p>
                    <p className="text-sm text-muted-foreground">
                      Faculty unavailable - Teaching another course
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-warning/20">
                <Button className="w-full" variant="outline">
                  Run AI Auto-Resolution
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}