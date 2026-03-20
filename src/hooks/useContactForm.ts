import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "../services/contact";
import { z } from "zod";
import toast from "react-hot-toast";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  serviceOfInterest: z.string().min(2, "Select a service"),
  projectDetails: z
    .string()
    .min(10, "Provide more details about your project")
    .max(500, "Maximum 500 characters allowed"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const useContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      serviceOfInterest: "",
      projectDetails: "",
    },
    mode: "onTouched",
  });

  // Optional: Persist form data in localStorage (draft recovery)
  useEffect(() => {
    const draft = localStorage.getItem("contactFormDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        form.reset(parsedDraft);
      } catch (e) {
        // ignore parse error on invalid cache
      }
    }
  }, [form]);

  // Optional: Autofill user email if logged in
  useEffect(() => {
    // Assuming a way to get user info, for example from localStorage 'user'
    const storedUser = localStorage.getItem("user");
    if (storedUser && !form.getValues("email")) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.email) {
          form.setValue("email", user.email);
        }
      } catch (e) {
        // skip
      }
    }
  }, [form]);

  // Save draft periodically
  const watchedValues = form.watch();
  useEffect(() => {
    const handler = setTimeout(() => {
      if (
        watchedValues.fullName ||
        watchedValues.email ||
        watchedValues.serviceOfInterest ||
        watchedValues.projectDetails
      ) {
        localStorage.setItem("contactFormDraft", JSON.stringify(watchedValues));
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [watchedValues]);

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      form.reset();
      localStorage.removeItem("contactFormDraft");
      toast.success(
        data.message || "We’ve received your request. Our team will reach out shortly."
      );
    },
    onError: (error: any) => {
      if (error?.status === 429) {
        toast.error("You’ve already submitted recently. Please wait before trying again.");
      } else if (error?.status === 400) {
        toast.error("Please check the form for validation errors.");
      } else {
        toast.error(error?.message || "Something went wrong. Please try again later.");
      }
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
