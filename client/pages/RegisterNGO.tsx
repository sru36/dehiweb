import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";

const registerNGOSchema = z.object({
  ngoName: z
    .string()
    .min(3, "NGO name must be at least 3 characters")
    .max(100, "NGO name must be less than 100 characters"),
  registeredAddress: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must be less than 500 characters"),
  areaOfOperation: z.enum(["local", "state", "national", "international"], {
    errorMap: () => ({ message: "Please select area of operation" }),
  }),
  ngoType: z.enum(["trust", "society", "section8"], {
    errorMap: () => ({ message: "Please select NGO type" }),
  }),
  registrationCertificate: z
    .instanceof(File)
    .refine((file) => file.size <= 5242880, "File size must be less than 5MB")
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "File must be PDF, JPG, or PNG"
    ),
});

type RegisterNGOFormData = z.infer<typeof registerNGOSchema>;

export default function RegisterNGO() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fileSelected, setFileSelected] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterNGOFormData>({
    resolver: zodResolver(registerNGOSchema),
  });

  const certificateFiles = watch("registrationCertificate");

  const onSubmit = async (data: RegisterNGOFormData) => {
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      reset();
      setFileSelected(null);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(file.name);
    }
  };

  return (
    <main className="bg-background text-foreground">
      <header className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Register Your NGO
          </h1>
          <p className="mt-2 text-foreground/70">
            Join our network of verified organizations making a real impact.
            Please fill in the details below to register your NGO.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {submitSuccess && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">
                  Registration submitted successfully!
                </p>
                <p className="text-sm text-green-800 mt-1">
                  We'll review your application and get back to you within 5-7
                  business days.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Basic Organizational Details */}
            <div className="rounded-lg border border-foreground/10 p-6 bg-card">
              <h2 className="text-2xl font-bold mb-6">
                Section 1: Basic Organizational Details
              </h2>

              <div className="space-y-5">
                {/* NGO Name */}
                <div>
                  <label htmlFor="ngoName" className="block font-semibold mb-2">
                    Name of the NGO <span className="text-[#FF5E5E]">*</span>
                  </label>
                  <input
                    id="ngoName"
                    type="text"
                    placeholder="Enter your NGO's full name"
                    className={`w-full px-4 py-2 rounded-md border bg-background transition-colors ${
                      errors.ngoName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-foreground/20 focus:ring-primary"
                    } focus:outline-none focus:ring-2`}
                    {...register("ngoName")}
                  />
                  {errors.ngoName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.ngoName.message}
                    </p>
                  )}
                </div>

                {/* Registered Office Address */}
                <div>
                  <label
                    htmlFor="registeredAddress"
                    className="block font-semibold mb-2"
                  >
                    Registered Office Address{" "}
                    <span className="text-[#FF5E5E]">*</span>
                  </label>
                  <textarea
                    id="registeredAddress"
                    placeholder="Enter your registered office address with proof document details (e.g., rental agreement or ownership document)"
                    rows={3}
                    className={`w-full px-4 py-2 rounded-md border bg-background transition-colors ${
                      errors.registeredAddress
                        ? "border-red-500 focus:ring-red-500"
                        : "border-foreground/20 focus:ring-primary"
                    } focus:outline-none focus:ring-2`}
                    {...register("registeredAddress")}
                  />
                  {errors.registeredAddress && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.registeredAddress.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-foreground/60">
                    Please mention proof documents like rental agreement or
                    ownership certificate
                  </p>
                </div>

                {/* Area of Operation */}
                <div>
                  <label
                    htmlFor="areaOfOperation"
                    className="block font-semibold mb-2"
                  >
                    Area of Operation <span className="text-[#FF5E5E]">*</span>
                  </label>
                  <select
                    id="areaOfOperation"
                    className={`w-full px-4 py-2 rounded-md border bg-background transition-colors ${
                      errors.areaOfOperation
                        ? "border-red-500 focus:ring-red-500"
                        : "border-foreground/20 focus:ring-primary"
                    } focus:outline-none focus:ring-2`}
                    {...register("areaOfOperation")}
                  >
                    <option value="">Select area of operation</option>
                    <option value="local">Local</option>
                    <option value="state">State-level</option>
                    <option value="national">National</option>
                    <option value="international">International</option>
                  </select>
                  {errors.areaOfOperation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.areaOfOperation.message}
                    </p>
                  )}
                </div>

                {/* Type of NGO */}
                <div>
                  <label htmlFor="ngoType" className="block font-semibold mb-2">
                    Type of NGO <span className="text-[#FF5E5E]">*</span>
                  </label>
                  <select
                    id="ngoType"
                    className={`w-full px-4 py-2 rounded-md border bg-background transition-colors ${
                      errors.ngoType
                        ? "border-red-500 focus:ring-red-500"
                        : "border-foreground/20 focus:ring-primary"
                    } focus:outline-none focus:ring-2`}
                    {...register("ngoType")}
                  >
                    <option value="">Select type of NGO</option>
                    <option value="trust">Trust</option>
                    <option value="society">Society</option>
                    <option value="section8">Section 8 Company</option>
                  </select>
                  {errors.ngoType && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.ngoType.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Compliance and Legal Requirements */}
            <div className="rounded-lg border border-foreground/10 p-6 bg-card">
              <h2 className="text-2xl font-bold mb-6">
                Section 2: Compliance and Legal Requirements
              </h2>

              <div className="space-y-5">
                {/* Registration Certificate Upload */}
                <div>
                  <label
                    htmlFor="registrationCertificate"
                    className="block font-semibold mb-2"
                  >
                    Registration Certificate{" "}
                    <span className="text-[#FF5E5E]">*</span>
                  </label>
                  <p className="text-sm text-foreground/70 mb-3">
                    Upload certificate issued by Registrar/Sub-Registrar or ROC
                    (PDF, JPG, or PNG - max 5MB)
                  </p>

                  <div
                    className={`relative rounded-md border-2 border-dashed transition-colors ${
                      errors.registrationCertificate
                        ? "border-red-500 bg-red-50"
                        : "border-foreground/20 bg-card hover:border-foreground/40"
                    }`}
                  >
                    <input
                      id="registrationCertificate"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      {...register("registrationCertificate")}
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center py-8 px-4">
                      <Upload className="h-8 w-8 text-foreground/40 mb-2" />
                      <p className="font-medium text-center">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-foreground/60 mt-1">
                        or click to select
                      </p>
                      {fileSelected && (
                        <p className="text-sm text-green-600 mt-3 font-medium flex items-center gap-1">
                          <Check className="h-4 w-4" />
                          {fileSelected}
                        </p>
                      )}
                    </div>
                  </div>

                  {errors.registrationCertificate && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.registrationCertificate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => {
                  reset();
                  setFileSelected(null);
                }}
              >
                Clear Form
              </Button>
            </div>

            <p className="text-sm text-foreground/70">
              By registering, you agree to our Terms of Service and confirm that
              all information provided is accurate and verified.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
