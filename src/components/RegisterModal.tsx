// import { useState } from "react";
// import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { cn } from "@/lib/utils";
// import { useRegisterModal } from "@/context/RegisterModalContext";
// import { API_ENDPOINTS } from "@/config/api";

// const COURSES = [
//   { id: "A1", label: "A1 - Beginner" },
//   { id: "A2", label: "A2 - Elementary" },
//   { id: "B1", label: "B1 - Intermediate" },
//   { id: "B2", label: "B2 - Upper Intermediate" },
// ];

// interface FormData {
//   name: string;
//   email: string;
//   mobileNo: string;
//   courses: string[];
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   mobileNo?: string;
//   courses?: string;
// }

// const RegisterModal = () => {
//   const { isOpen, closeModal } = useRegisterModal();
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     mobileNo: "",
//     courses: [],
//   });
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (!formData.mobileNo.trim()) {
//       newErrors.mobileNo = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobileNo.replace(/\D/g, ""))) {
//       newErrors.mobileNo = "Please enter a valid 10-digit mobile number";
//     }

//     if (formData.courses.length === 0) {
//       newErrors.courses = "Please select at least one course";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name as keyof FormErrors]) {
//       setErrors((prev) => ({ ...prev, [name]: undefined }));
//     }
//   };

//   const handleCourseChange = (courseId: string, checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       courses: checked
//         ? [...prev.courses, courseId]
//         : prev.courses.filter((c) => c !== courseId),
//     }));
//     if (errors.courses) {
//       setErrors((prev) => ({ ...prev, courses: undefined }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setSubmitStatus(null);
//     setErrorMessage("");

//     try {
//       const response = await fetch(API_ENDPOINTS.CONTACT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           mobileNo: formData.mobileNo,
//           courses: formData.courses,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setSubmitStatus("success");
//         setTimeout(() => {
//           closeModal();
//           window.location.href = "https://lms.edustack.ca/register";
//         }, 1500);
//       } else {
//         setSubmitStatus("error");
//         setErrorMessage(data.message || "Something went wrong. Please try again.");
//       }
//     } catch {
//       setSubmitStatus("error");
//       setErrorMessage("Network error. Please check your connection and try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     if (!isSubmitting) {
//       closeModal();
//       // Reset form state when closing
//       setFormData({ name: "", email: "", mobileNo: "", courses: [] });
//       setErrors({});
//       setSubmitStatus(null);
//       setErrorMessage("");
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
//       <DialogContent className="sm:max-w-[425px] md:max-w-[500px] p-0 overflow-hidden">
//         {/* Header */}
//         <div className="bg-primary px-6 py-4">
//           <DialogHeader>
//             <DialogTitle className="text-primary-foreground text-xl font-bold">
//               Register for French Courses
//             </DialogTitle>
//           </DialogHeader>
//           <p className="text-primary-foreground/80 text-sm mt-1">
//             Fill in your details to get started
//           </p>
//         </div>

//         {/* Close button */}
//         <button
//           onClick={handleClose}
//           className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
//           disabled={isSubmitting}
//         >
//           <X className="h-5 w-5 text-primary-foreground" />
//           <span className="sr-only">Close</span>
//         </button>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {/* Success message */}
//           {submitStatus === "success" && (
//             <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
//               <p className="text-green-700 text-sm font-medium">
//                 Registration successful! Redirecting...
//               </p>
//             </div>
//           )}

//           {/* Error message */}
//           {submitStatus === "error" && (
//             <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
//               <p className="text-red-700 text-sm">{errorMessage}</p>
//             </div>
//           )}

//           {/* Name field */}
//           <div className="space-y-2">
//             <Label htmlFor="name" className="text-sm font-medium">
//               Name <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
//               disabled={isSubmitting || submitStatus === "success"}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs">{errors.name}</p>
//             )}
//           </div>

//           {/* Email field */}
//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-sm font-medium">
//               Email <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email address"
//               value={formData.email}
//               onChange={handleInputChange}
//               className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
//               disabled={isSubmitting || submitStatus === "success"}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs">{errors.email}</p>
//             )}
//           </div>

//           {/* Mobile field */}
//           <div className="space-y-2">
//             <Label htmlFor="mobileNo" className="text-sm font-medium">
//               Mobile No <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="mobileNo"
//               name="mobileNo"
//               type="tel"
//               placeholder="Enter your mobile number"
//               value={formData.mobileNo}
//               onChange={handleInputChange}
//               className={cn(errors.mobileNo && "border-red-500 focus-visible:ring-red-500")}
//               disabled={isSubmitting || submitStatus === "success"}
//             />
//             {errors.mobileNo && (
//               <p className="text-red-500 text-xs">{errors.mobileNo}</p>
//             )}
//           </div>

//           {/* Courses field */}
//           <div className="space-y-3">
//             <Label className="text-sm font-medium">
//               Courses <span className="text-red-500">*</span>
//             </Label>
//             <div className="grid grid-cols-2 gap-3">
//               {COURSES.map((course) => (
//                 <label
//                   key={course.id}
//                   className={cn(
//                     "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
//                     formData.courses.includes(course.id)
//                       ? "border-secondary bg-secondary/10"
//                       : "border-input hover:border-secondary/50",
//                     (isSubmitting || submitStatus === "success") && "cursor-not-allowed opacity-70"
//                   )}
//                 >
//                   <Checkbox
//                     id={`course-${course.id}`}
//                     checked={formData.courses.includes(course.id)}
//                     onCheckedChange={(checked) =>
//                       handleCourseChange(course.id, checked as boolean)
//                     }
//                     disabled={isSubmitting || submitStatus === "success"}
//                     className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
//                   />
//                   <span className="text-sm font-medium">{course.label}</span>
//                 </label>
//               ))}
//             </div>
//             {errors.courses && (
//               <p className="text-red-500 text-xs">{errors.courses}</p>
//             )}
//           </div>

//           {/* Submit button */}
//           <Button
//             type="submit"
//             variant="gold"
//             size="lg"
//             className="w-full shadow-gold cta-shimmer"
//             disabled={isSubmitting || submitStatus === "success"}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               "Submit Registration"
//             )}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RegisterModal;



import { useState } from "react";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useRegisterModal } from "@/context/RegisterModalContext";
import { API_ENDPOINTS } from "@/config/api";

const COURSES = [
  { id: "A1", label: "A1 - Beginner" },
  { id: "A2", label: "A2 - Elementary" },
  { id: "B1", label: "B1 - Intermediate" },
  { id: "B2", label: "B2 - Upper Intermediate" },
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

const RegisterModal = () => {
  const { isOpen, closeModal } = useRegisterModal();
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
          closeModal();
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

  const handleClose = () => {
    if (!isSubmitting) {
      closeModal();
      setFormData({ name: "", email: "", mobileNo: "", courses: [] });
      setErrors({});
      setSubmitStatus(null);
      setErrorMessage("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-[95vw] max-w-[425px] md:max-w-[500px] p-0 overflow-hidden rounded-xl">
        {/* Header */}
        <div className="bg-primary px-4 sm:px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-primary-foreground text-lg sm:text-xl font-bold">
              Register for French Courses
            </DialogTitle>
          </DialogHeader>
          <p className="text-primary-foreground/80 text-xs sm:text-sm mt-1">
            Fill in your details to get started
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          disabled={isSubmitting}
        >
          <X className="h-5 w-5 text-primary-foreground" />
          <span className="sr-only">Close</span>
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Success message */}
          {submitStatus === "success" && (
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0" />
              <p className="text-green-700 text-xs sm:text-sm font-medium">
                Registration successful! Redirecting...
              </p>
            </div>
          )}

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 shrink-0" />
              <p className="text-red-700 text-xs sm:text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Name field */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs sm:text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className={cn("h-10 text-sm", errors.name && "border-red-500 focus-visible:ring-red-500")}
              disabled={isSubmitting || submitStatus === "success"}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className={cn("h-10 text-sm", errors.email && "border-red-500 focus-visible:ring-red-500")}
              disabled={isSubmitting || submitStatus === "success"}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Mobile field */}
          <div className="space-y-1.5">
            <Label htmlFor="mobileNo" className="text-xs sm:text-sm font-medium">
              Mobile No <span className="text-red-500">*</span>
            </Label>
            <Input
              id="mobileNo"
              name="mobileNo"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className={cn("h-10 text-sm", errors.mobileNo && "border-red-500 focus-visible:ring-red-500")}
              disabled={isSubmitting || submitStatus === "success"}
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-xs">{errors.mobileNo}</p>
            )}
          </div>

          {/* Courses field */}
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm font-medium">
              Courses <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {COURSES.map((course) => (
                <label
                  key={course.id}
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-all",
                    formData.courses.includes(course.id)
                      ? "border-secondary bg-secondary/10"
                      : "border-input hover:border-secondary/50",
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
                  <span className="text-xs sm:text-sm font-medium">{course.label}</span>
                </label>
              ))}
            </div>
            {errors.courses && (
              <p className="text-red-500 text-xs">{errors.courses}</p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full shadow-gold cta-shimmer"
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;