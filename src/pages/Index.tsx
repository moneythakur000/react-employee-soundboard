
import FeedbackForm from "@/components/FeedbackForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary">Company Feedback System</h1>
          <p className="text-gray-600">Your feedback helps us improve our workplace</p>
        </div>
      </header>
      <FeedbackForm />
    </div>
  );
};

export default Index;
