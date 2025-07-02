import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send, BookOpen, Lightbulb, Star } from "lucide-react";
import heroImage from "@/assets/homework-hero.jpg";

interface Question {
  id: string;
  question: string;
  grade: string;
  answer: string;
  timestamp: Date;
}

const HomeworkHelper = () => {
  const [question, setQuestion] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const grades = [
    { value: "kindergarten", label: "Kindergarten" },
    { value: "grade1", label: "Grade 1" },
    { value: "grade2", label: "Grade 2" },
    { value: "grade3", label: "Grade 3" },
    { value: "grade4", label: "Grade 4" },
    { value: "grade5", label: "Grade 5" },
    { value: "grade6", label: "Grade 6" },
    { value: "grade7", label: "Grade 7" },
    { value: "grade8", label: "Grade 8" },
    { value: "high-school", label: "High School" },
  ];

  const generateAnswer = (question: string, grade: string): string => {
    // Simulated AI response - in production, this would call your AI API
    const gradeLevel = grades.find(g => g.value === grade)?.label || "appropriate level";
    
    if (question.toLowerCase().includes("math") || question.includes("+") || question.includes("-") || question.includes("×") || question.includes("÷")) {
      return `Great math question! Let me break this down for a ${gradeLevel} student:

🔢 **Step-by-step solution:**
1. First, let's identify what we're looking for
2. Then we'll work through it step by step
3. Finally, we'll check our answer

💡 **Remember:** Take your time with each step, and it's okay to use your fingers or draw pictures to help visualize the problem!

Would you like me to explain any specific part in more detail?`;
    }
    
    if (question.toLowerCase().includes("science")) {
      return `Awesome science question! Here's a ${gradeLevel}-friendly explanation:

🔬 **The Science Behind It:**
This is a fascinating topic that connects to the world around us!

🌟 **Think About It:**
Have you noticed this in everyday life? Science is everywhere!

🎯 **Simple Explanation:**
Let me explain this in a way that's easy to understand and remember.

Keep asking great questions - that's how we learn!`;
    }

    return `Great question! Let me help explain this for a ${gradeLevel} student:

📚 **Here's what we need to know:**
I'll break this down into simple, easy-to-understand parts.

✨ **Key Points:**
• Let's start with the basics
• Then we'll build up our understanding
• Finally, we'll put it all together

🎉 **You're doing great!** Learning takes practice, and asking questions shows you're thinking critically. Keep it up!`;
  };

  const handleSubmit = async () => {
    if (!question.trim() || !selectedGrade) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: question.trim(),
      grade: selectedGrade,
      answer: generateAnswer(question.trim(), selectedGrade),
      timestamp: new Date(),
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setQuestion("");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src={heroImage} 
                alt="Homework Helper" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-glow"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Kid Smart
              <span className="block text-secondary">Homework Helper</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get instant, child-friendly explanations for any homework question. 
              We make learning fun and easy to understand!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <BookOpen className="w-4 h-4 mr-2" />
                All Subjects
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Lightbulb className="w-4 h-4 mr-2" />
                Step-by-Step
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Star className="w-4 h-4 mr-2" />
                Grade-Appropriate
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Question Input */}
          <Card className="shadow-soft border-border/50 bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary">
                Ask Your Homework Question
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Select Grade Level
                  </label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your grade..." />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Your Question
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your homework question here... For example: 'What is 25 + 17?' or 'How do plants grow?'"
                    className="min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={!question.trim() || !selectedGrade || isLoading}
                size="lg"
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Getting Your Answer...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Get Help Now!
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Previous Questions */}
          {questions.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary text-center">
                Your Recent Questions
              </h2>
              
              {questions.map((q) => (
                <Card key={q.id} className="shadow-soft border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-primary/10">
                        {grades.find(g => g.value === q.grade)?.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {q.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Question:</h4>
                      <p className="text-foreground">{q.question}</p>
                    </div>
                    
                    <div className="bg-gradient-secondary/10 p-4 rounded-lg border border-secondary/20">
                      <h4 className="font-semibold text-secondary mb-2">Answer:</h4>
                      <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line">
                        {q.answer}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="text-center border-border/50 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">All Subjects</h3>
                <p className="text-sm text-muted-foreground">
                  Math, Science, English, History - we help with everything!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Easy Explanations</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step answers that are easy to understand.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Grade-Appropriate</h3>
                <p className="text-sm text-muted-foreground">
                  Answers tailored to your child's grade level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkHelper;