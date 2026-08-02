import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "DailyCalc Pro's privacy policy covering cookies, Google AdSense, localStorage usage, and geolocation for the Prayer Time Calculator.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-white">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose-dcp mt-6">
        <h2>Overview</h2>
        <p>
          DailyCalc Pro ("we", "us", "our") operates dailycalcpro.com. This
          policy explains what information is collected when you use our
          calculators and why.
        </p>

        <h2>Information we do not collect</h2>
        <p>
          DailyCalc Pro does not require an account, and we do not collect
          names, email addresses, or payment information. Every calculation
          runs directly in your browser — the numbers you enter into a
          calculator are never transmitted to our servers.
        </p>

        <h2>Local storage</h2>
        <p>
          Some tools offer a "save history" feature and remember your
          dark/light mode preference. This data is stored using your
          browser's localStorage, stays entirely on your device, and is
          never sent to us. You can clear it at any time by clearing your
          browser's site data or using the "clear history" control on the
          relevant tool.
        </p>

        <h2>Geolocation</h2>
        <p>
          The Prayer Time Calculator can use your browser's geolocation
          permission to detect your approximate coordinates so it can return
          accurate prayer times for your area. Location is requested only
          with your explicit browser permission, is used solely to query a
          prayer-time calculation, and is not stored on our servers.
        </p>

        <h2>Cookies and Google AdSense</h2>
        <p>
          We use Google AdSense to display advertising. Google and its
          partners may use cookies and similar technologies to serve ads
          based on your prior visits to this or other websites. You can
          opt out of personalized advertising by visiting{" "}
          <a href="https://adssettings.google.com" className="text-accent hover:underline">
            Google&apos;s Ads Settings
          </a>
          , or by visiting{" "}
          <a href="https://www.aboutads.info" className="text-accent hover:underline">
            aboutads.info
          </a>{" "}
          to opt out of participating vendors&apos; use of cookies for
          personalized advertising.
        </p>
        <p>
          As a third-party vendor, Google uses cookies to serve ads on our
          site. Google's use of advertising cookies enables it and its
          partners to serve ads based on your visits to this site and other
          sites on the Internet.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use privacy-respecting analytics to understand aggregate
          traffic patterns (such as which calculators are most used). This
          data is anonymized and is not linked to any personally
          identifiable information.
        </p>

        <h2>Children's privacy</h2>
        <p>
          DailyCalc Pro is not directed at children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent through our{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
