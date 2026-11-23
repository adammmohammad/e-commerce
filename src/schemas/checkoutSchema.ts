import { z } from "zod";

// Rules for the checkout form
export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter your delivery address"),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;
export type CheckoutErrors = Partial<Record<keyof CheckoutData, string>>;

// Returns one message per invalid field ({} when the form is valid)
export function validateCheckout(data: CheckoutData): CheckoutErrors {
  const result = checkoutSchema.safeParse(data);
  if (result.success) return {};

  const errors: CheckoutErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof CheckoutData;
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}
