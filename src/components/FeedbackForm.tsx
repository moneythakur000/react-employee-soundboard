
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

type Feedback = {
  name: string;
  department: string;
  feedback: string;
  rating: string;
  id: number;
};

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissions, setSubmissions] = useState<Feedback[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Please enter your name";
    if (!department) newErrors.department = "Please select your department";
    if (!feedback) newErrors.feedback = "Feedback is required";
    if (!rating) newErrors.rating = "Please select a rating";
    
    setErrors(newErrors);
    
    // If validation passes
    if (Object.keys(newErrors).length === 0) {
      // Create new feedback entry
      const newFeedback = {
        name,
        department,
        feedback,
        rating,
        id: Date.now(),
      };
      
      // Add to submissions list
      setSubmissions([...submissions, newFeedback]);
      
      // Reset form
      setName("");
      setDepartment("");
      setFeedback("");
      setRating("");
      
      toast.success("Thank you for your feedback!");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl">Share Your Feedback</CardTitle>
          <CardDescription className="text-white/90">
            Help us improve our workplace
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger 
                  id="department"
                  className={errors.department ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Support">Customer Support</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts with us"
                className={`min-h-[120px] ${errors.feedback ? "border-red-500" : ""}`}
              />
              {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
            </div>

            <div>
              <Label>Rating</Label>
              <RadioGroup 
                value={rating}
                onValueChange={setRating}
                className="flex items-center space-x-8 mt-2"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                    <Label htmlFor={`rating-${value}`}>{value}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>

            <Button type="submit" className="w-full">Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>

      {submissions.length > 0 && (
        <div className="mt-10 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Recent Feedback</h2>
          <div className="rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.feedback}</TableCell>
                    <TableCell className="text-center">{item.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
