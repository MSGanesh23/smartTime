import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Users, 
  Clock,
  Star,
  Filter
} from 'lucide-react';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      department: 'Computer Science',
      credits: 4,
      type: 'Core',
      semester: 1,
      enrolledStudents: 120,
      maxCapacity: 150,
      faculty: 'Dr. Sarah Johnson',
      duration: 3,
      isElective: false
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Linear Algebra',
      department: 'Mathematics',
      credits: 3,
      type: 'Core',
      semester: 2,
      enrolledStudents: 85,
      maxCapacity: 100,
      faculty: 'Prof. Michael Chen',
      duration: 2,
      isElective: false
    },
    {
      id: 3,
      code: 'ENG105',
      name: 'Creative Writing Workshop',
      department: 'English Literature',
      credits: 2,
      type: 'Elective',
      semester: 1,
      enrolledStudents: 25,
      maxCapacity: 30,
      faculty: 'Dr. Emily Rodriguez',
      duration: 2,
      isElective: true
    },
    {
      id: 4,
      code: 'PHY301',
      name: 'Quantum Mechanics',
      department: 'Physics',
      credits: 4,
      type: 'Core',
      semester: 3,
      enrolledStudents: 45,
      maxCapacity: 60,
      faculty: 'Dr. Robert Kim',
      duration: 3,
      isElective: false
    },
    {
      id: 5,
      code: 'BIO201',
      name: 'Molecular Biology Lab',
      department: 'Biology',
      credits: 2,
      type: 'Lab',
      semester: 2,
      enrolledStudents: 30,
      maxCapacity: 24,
      faculty: 'Dr. Lisa Wang',
      duration: 4,
      isElective: false
    }
  ];

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Course Management
            </h1>
            <p className="text-muted-foreground">
              Manage courses, credits, and academic structure for NEP 2020 compliance
            </p>
          </div>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Create a new course with NEP 2020 compliant structure
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Course Code</Label>
                  <Input placeholder="e.g., CS101" />
                </div>
                <div className="space-y-2">
                  <Label>Credits</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Credit</SelectItem>
                      <SelectItem value="2">2 Credits</SelectItem>
                      <SelectItem value="3">3 Credits</SelectItem>
                      <SelectItem value="4">4 Credits</SelectItem>
                      <SelectItem value="6">6 Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Course Name</Label>
                  <Input placeholder="Enter course name" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Course Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core">Core</SelectItem>
                      <SelectItem value="elective">Elective</SelectItem>
                      <SelectItem value="lab">Laboratory</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Course description and learning objectives" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Add Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search courses by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="shadow-sm border-border hover:shadow-elegant transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {course.code}
                      </Badge>
                      <Badge variant={course.isElective ? "secondary" : "default"} className="text-xs">
                        {course.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
                    <CardDescription className="text-sm">{course.department}</CardDescription>
                  </div>
                  {course.isElective && (
                    <Star className="h-4 w-4 text-warning" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{course.credits} Credits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}h/week</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Enrollment</span>
                      <span className={course.enrolledStudents > course.maxCapacity ? 'text-warning' : 'text-foreground'}>
                        {course.enrolledStudents}/{course.maxCapacity}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          course.enrolledStudents > course.maxCapacity ? 'bg-warning' : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min((course.enrolledStudents / course.maxCapacity) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">
                      <Users className="h-3 w-3 inline mr-1" />
                      {course.faculty}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm border-border">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">{courses.length}</div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">
                {courses.filter(c => c.isElective).length}
              </div>
              <p className="text-sm text-muted-foreground">Elective Courses</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">
                {courses.reduce((sum, c) => sum + c.credits, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Credits</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">
                {new Set(courses.map(c => c.department)).size}
              </div>
              <p className="text-sm text-muted-foreground">Departments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}