import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2, CheckCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/config/api";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import heroImg from "@/assets/hero-students.jpg";

const COURSES = [
  { id: "A1", label: "A1 - Beginner" },
  { id: "A2", label: "A2 - Elementary" },
  { id: "B1", label: "B1 - Intermediate" },
  { id: "B2", label: "B2 - Upper Intermediate" },
];

const benefits = [
  "Expert French instructors with real-world experience",
  "Structured curriculum from A1 to B2 levels",
  "Flexible recorded + live interactive sessions",
  "TEF/TCF exam preparation with guided practice",
  "Personal mentorship & continuous support",
  "Affordable learning for study & immigration goals",
];

interface FormData {
  name: string;
  email: string;
  mobileNo: string;
  courses: string[];
}

interface FormErrors {
  name?: string;
  email?: string;
  mobileNo?: string;
  courses?: string;
}

const Register = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobileNo: "",
    courses: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNo.replace(/\D/g, ""))) {
      newErrors.mobileNo = "Please enter a valid 10-digit mobile number";
    }

    if (formData.courses.length === 0) {
      newErrors.courses = "Please select at least one course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCourseChange = (courseId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      courses: checked
        ? [...prev.courses, courseId]
        : prev.courses.filter((c) => c !== courseId),
    }));
    if (errors.courses) {
      setErrors((prev) => ({ ...prev, courses: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobileNo,
          courses: formData.courses,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setTimeout(() => {
          window.location.href = "https://lms.edustack.ca/register";
        }, 1500);
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 sm:pt-32 md:pt-36">
        <section className="pb-20 md:pb-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left — Marketing Content */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-primary leading-tight">
                    Start Your French <br className="hidden sm:block" />
                    Learning Journey
                  </h1>

                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4 max-w-lg">
                    Join hundreds of students building their future in Canada through French fluency. Fill in the form to secure your spot in the next batch.
                  </p>
                </div>

                {/* Benefits list */}
                <div className="space-y-3">
                  {benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-3 text-sm md:text-base font-medium text-foreground"
                    >
                      <CheckCircle2 className="text-secondary shrink-0" size={18} />
                      {b}
                    </div>
                  ))}
                </div>

                {/* Image — visible only on lg+ */}
                <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-lg border">
                  <img
                    src={heroImg}
                    alt="Students learning French at Edustack"
                    className="w-full h-[220px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </div>

              {/* Right — Registration Form */}
              <div className="bg-card rounded-2xl border shadow-xl p-6 sm:p-8 md:p-10">
                <div className="space-y-1 mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-primary">
                    Register for French Courses
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Fill in your details to get started
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Success message */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                      <p className="text-green-700 text-sm font-medium">
                        Registration successful! Redirecting...
                      </p>
                    </div>
                  )}

                  {/* Error message */}
                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={cn("h-11 text-sm", errors.name && "border-red-500 focus-visible:ring-red-500")}
                      disabled={isSubmitting || submitStatus === "success"}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn("h-11 text-sm", errors.email && "border-red-500 focus-visible:ring-red-500")}
                      disabled={isSubmitting || submitStatus === "success"}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Mobile field */}
                  <div className="space-y-2">
                    <Label htmlFor="mobileNo" className="text-sm font-medium text-foreground">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobileNo"
                      name="mobileNo"
                      type="tel"
                      placeholder="Enter your 10-digit mobile number"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      className={cn("h-11 text-sm", errors.mobileNo && "border-red-500 focus-visible:ring-red-500")}
                      disabled={isSubmitting || submitStatus === "success"}
                    />
                    {errors.mobileNo && (
                      <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                    )}
                  </div>

                  {/* Courses field */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">
                      Select Courses <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {COURSES.map((course) => (
                        <label
                          key={course.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                            formData.courses.includes(course.id)
                              ? "border-secondary bg-secondary/10 shadow-sm"
                              : "border-border hover:border-secondary/50 hover:bg-muted/30",
                            (isSubmitting || submitStatus === "success") && "cursor-not-allowed opacity-70"
                          )}
                        >
                          <Checkbox
                            id={`course-${course.id}`}
                            checked={formData.courses.includes(course.id)}
                            onCheckedChange={(checked) =>
                              handleCourseChange(course.id, checked as boolean)
                            }
                            disabled={isSubmitting || submitStatus === "success"}
                            className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary shrink-0"
                          />
                          <span className="text-sm font-medium text-foreground">{course.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.courses && (
                      <p className="text-red-500 text-xs mt-1">{errors.courses}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full h-12 shadow-gold cta-shimmer cta-hover text-base font-semibold mt-2"
                    disabled={isSubmitting || submitStatus === "success"}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    By registering, you agree to be contacted by Edustack regarding course enrollment.
                  </p>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Register;