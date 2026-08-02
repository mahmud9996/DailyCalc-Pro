import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the DailyCalc Pro team for feedback, bug reports, or partnership inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-white">
        Contact Us
      </h1>
      <p className="mt-3 text-ink-muted">
        Found a bug, have a feature request, or want to suggest a new
        calculator? We'd love to hear from you.
      </p>

      <ContactForm />
    </div>
  );
}
