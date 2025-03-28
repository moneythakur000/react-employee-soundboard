
import React, { useState, FormEvent } from "react";
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

interface FeedbackData {
  name: string;
  department: string;
  feedback: string;
  rating: string;
  id: number;
}

const FeedbackForm = () => {
  const [formData, setFormData] = useState<Omit<FeedbackData, "id">>({
    name: "",
    department: "",
    feedback: "",
    rating: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackData[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
    }));
    
    // Clear error for department if it exists
    if (errors.department) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.department;
        return newErrors;
      });
    }
  };

  const handleRatingChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
    
    // Clear error for rating if it exists
    if (errors.rating) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    
    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    }
    
    if (!formData.rating) {
      newErrors.rating = "Rating is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newFeedbackEntry: FeedbackData = {
        ...formData,
        id: Date.now(),
      };
      
      setSubmittedFeedback((prev) => [...prev, newFeedbackEntry]);
      
      // Reset form
      setFormData({
        name: "",
        department: "",
        feedback: "",
        rating: "",
      });
      
      toast.success("Feedback submitted successfully!");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Employee Feedback</CardTitle>
          <CardDescription className="text-white/90">
            Share your thoughts to help us improve
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select 
                value={formData.department} 
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger 
                  id="department"
                  className={errors.department ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Customer Support">Customer Support</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && <p className="form-error">{errors.department}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                placeholder="Please share your feedback or suggestions"
                className={`min-h-[120px] ${errors.feedback ? "border-red-500" : ""}`}
              />
              {errors.feedback && <p className="form-error">{errors.feedback}</p>}
            </div>

            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <RadioGroup 
                value={formData.rating}
                onValueChange={handleRatingChange}
                className="rating-group"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                    <Label htmlFor={`rating-${value}`}>{value}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.rating && <p className="form-error">{errors.rating}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full"
            >
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      {submittedFeedback.length > 0 && (
        <div className="mt-10 feedback-animation">
          <h2 className="text-2xl font-bold mb-4">Submitted Feedback</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Department</th>
                  <th className="border p-3 text-left">Feedback</th>
                  <th className="border p-3 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {submittedFeedback.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="border p-3">{entry.name}</td>
                    <td className="border p-3">{entry.department}</td>
                    <td className="border p-3">{entry.feedback}</td>
                    <td className="border p-3 text-center">{entry.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
