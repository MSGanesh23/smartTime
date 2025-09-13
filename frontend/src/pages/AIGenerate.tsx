import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bot, 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Settings,
  Download,
  Eye
} from 'lucide-react';

export default function AIGenerate() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English Literature',
    'Economics'
  ];

  const generationSteps = [
    { id: 1, name: 'Data Collection', description: 'Gathering courses, faculty, and classroom data' },
    { id: 2, name: 'Constraint Analysis', description: 'Analyzing scheduling constraints and requirements' },
    { id: 3, name: 'AI Processing', description: 'Ollama LLM generating optimal timetable structure' },
    { id: 4, name: 'Conflict Detection', description: 'Identifying and resolving scheduling conflicts' },
    { id: 5, name: 'Optimization', description: 'Fine-tuning for maximum efficiency' },
    { id: 6, name: 'Validation', description: 'Ensuring NEP 2020 compliance and quality checks' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate AI generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(generationSteps[i].name);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProgress(((i + 1) / generationSteps.length) * 100);
    }
    
    setIsGenerating(false);
    setCurrentStep('Complete');
  };

  const recentGenerations = [
    {
      id: 1,
      department: 'Computer Science',
      status: 'Completed',
      timestamp: '2 hours ago',
      conflicts: 0,
      efficiency: 95
    },
    {
      id: 2,
      department: 'Mathematics',
      status: 'In Progress',
      timestamp: '30 minutes ago',
      conflicts: 2,
      efficiency: 78
    },
    {
      id: 3,
      department: 'Physics',
      status: 'Failed',
      timestamp: '1 day ago',
      conflicts: 5,
      efficiency: 0
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Bot className="h-8 w-8 text-primary" />
              AI Timetable Generation
            </h1>
            <p className="text-muted-foreground">
              Generate optimized timetables using advanced AI with Ollama LLM integration
            </p>
          </div>
        </div>

        {/* Generation Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <Card className="shadow-elegant border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Generation Configuration
              </CardTitle>
              <CardDescription>
                Configure parameters for AI-powered timetable generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department to generate" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase().replace(' ', '-')}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Semester</label>
                    <Select defaultValue="current">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Semester</SelectItem>
                        <SelectItem value="next">Next Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="speed">Speed</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="optimal">Optimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-4 bg-info/5 border border-info/20 rounded-lg">
                  <h4 className="font-medium text-info mb-2">AI Model: Ollama LLM</h4>
                  <p className="text-sm text-info/80">
                    Using local Ollama instance for privacy-focused, offline timetable generation
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleGenerate}
                  disabled={!selectedDepartment || isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Generate Timetable
                    </>
                  )}
                </Button>
                <Button variant="outline" disabled={isGenerating}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Panel */}
          <Card className="shadow-elegant border-border">
            <CardHeader>
              <CardTitle>Generation Progress</CardTitle>
              <CardDescription>
                Real-time status of AI timetable generation process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isGenerating || progress > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Overall Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Current Step: {currentStep}</h4>
                    {generationSteps.map((step, index) => {
                      const isActive = Math.floor((progress / 100) * generationSteps.length) === index;
                      const isComplete = Math.floor((progress / 100) * generationSteps.length) > index;
                      
                      return (
                        <div key={step.id} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isActive ? 'bg-primary/5 border border-primary/20' : 
                          isComplete ? 'bg-success/5 border border-success/20' : 
                          'bg-muted/30'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isComplete ? 'bg-success text-success-foreground' :
                            isActive ? 'bg-primary text-primary-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {isComplete ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <span className="text-xs font-medium">{step.id}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{step.name}</p>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-muted-foreground mb-2">Ready to Generate</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a department and click generate to start AI timetable creation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Generations */}
        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle>Recent Generations</CardTitle>
            <CardDescription>
              History of timetable generation attempts with status and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGenerations.map((gen) => (
                <div key={gen.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      gen.status === 'Completed' ? 'bg-success/10 text-success' :
                      gen.status === 'In Progress' ? 'bg-info/10 text-info' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {gen.status === 'Completed' ? <CheckCircle2 className="h-5 w-5" /> :
                       gen.status === 'In Progress' ? <RefreshCw className="h-5 w-5 animate-spin" /> :
                       <AlertTriangle className="h-5 w-5" />}
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{gen.department}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{gen.timestamp}</span>
                        <span>•</span>
                        <span>{gen.conflicts} conflicts</span>
                        <span>•</span>
                        <span>{gen.efficiency}% efficiency</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={
                      gen.status === 'Completed' ? 'default' :
                      gen.status === 'In Progress' ? 'secondary' : 'destructive'
                    }>
                      {gen.status}
                    </Badge>
                    
                    {gen.status === 'Completed' && (
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}