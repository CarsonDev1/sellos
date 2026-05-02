import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Đăng Ký — SellOS",
};

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "w-full",
          card: "shadow-xl border border-slate-100 rounded-2xl",
          headerTitle: "font-heading font-bold text-slate-900",
          headerSubtitle: "text-slate-500",
          socialButtonsBlockButton: "border border-slate-200 hover:bg-slate-50 font-medium text-slate-700",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl",
          formFieldInput: "border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400",
          footerActionLink: "text-blue-600 font-semibold hover:text-blue-700",
          identityPreviewEditButton: "text-blue-600",
        },
        variables: {
          colorPrimary: "#2563eb",
          colorText: "#0f172a",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-body), sans-serif",
        },
      }}
    />
  );
}
