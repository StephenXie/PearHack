"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  companyId: string;
  benefitDocument: File | null;
};

const companies = [
  { id: "1", name: "Google" },
  { id: "2", name: "Facebook" },
  { id: "3", name: "Apple" },
  { id: "4", name: "Netflix" },
  { id: "5", name: "Amazon" },
];

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyId: "",
    benefitDocument: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();


  const updateFormData = (
    field: keyof FormData,
    value: string | File | null
  ) => {
    console.log("here 0 field", field, "value", value);
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        updateFormData("benefitDocument", selectedFile);
      } else {
        setError("Please upload a PDF file");
      }
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email) {
          setError("Please fill in all fields");
          return false;
        }
        break;
      case 2:
        if (!(formData.companyId || formData.benefitDocument)) {
          setError("Please select your company");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3));
      setError(null);
    }
  };

const handleComplete = async () => {
  setLoading(true);
  setError(null);
  const formDataToSend = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "benefitDocument" && value instanceof File) {
      formDataToSend.append(key, value);
    } else if (typeof value === "string") {
      formDataToSend.append(key, value);
    }
  });

  try {
    const response = await fetch(
      "https://deep-stable-gorilla.ngrok-free.app/api/upload_file",
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    
    router.push(`/video_player`);
    // redirect(`/localhost:3000/video_player`); 

  } catch (err) {
    setError((err as Error).message);
  } finally {
    // should navigate to the next page or show a success message
    setStep(3);
  }
};

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please provide your personal details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Company Selection or Benefit Upload</CardTitle>
              <CardDescription>
                Please select your company or Upload your benefit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => updateFormData("companyId", value)}
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select your company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="document">Benefit Document (PDF)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("document")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {formData.benefitDocument ? "Change File" : "Upload File"}
                  </Button>
                  {formData.benefitDocument && (
                    <span className="text-sm text-muted-foreground">
                      {formData.benefitDocument.name}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Confirmation</CardTitle>
              <CardDescription>Please review your information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Personal Information</h3>
                <p>
                  Name: {formData.firstName} {formData.lastName}
                </p>
                <p>Email: {formData.email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Benefit Document</h3>
                <p>
                  {formData.benefitDocument
                    ? formData.benefitDocument.name
                    : "Not uploaded"}
                </p>
              </div>
            </CardContent>
          </>
        );
    }
  };

  return (
    <Card className="w-[550px]">
      {renderStep()}
      {error && (
        <div className="px-6 pb-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleComplete}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Complete
          </Button>
        )}
      </CardFooter>
      <div className="px-6 pb-4">
        <div className="flex justify-center items-center h-full">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-1/6 h-2 rounded-full ${
                s <= step ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
