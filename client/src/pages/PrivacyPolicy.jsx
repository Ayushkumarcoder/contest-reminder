import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page-container" style={{ flex: 1 }}>
      <div className="legal-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 4, 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Contest Reminder ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <h3>2.1 Information Collected via Google OAuth</h3>
          <p>When you sign in using Google OAuth, we collect the following information:</p>
          <ul>
            <li><strong>Name:</strong> Your full name as provided by your Google account</li>
            <li><strong>Email Address:</strong> Your email address associated with your Google account</li>
            <li><strong>Profile Picture:</strong> Your profile picture (if provided by Google)</li>
            <li><strong>Google User ID:</strong> A unique identifier from Google for authentication purposes</li>
          </ul>
          
          <h3>2.2 OAuth Scopes</h3>
          <p>We request the following OAuth scopes:</p>
          <ul>
            <li><strong>email:</strong> To access your email address</li>
            <li><strong>profile:</strong> To access your basic profile information</li>
            <li><strong>openid:</strong> For authentication purposes</li>
          </ul>

          <h3>2.3 Usage Data</h3>
          <p>We may collect information about how you interact with our application, including:</p>
          <ul>
            <li>Contest preferences and watchlists</li>
            <li>Notification settings</li>
            <li>Device information and browser type</li>
            <li>IP address and access times</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li><strong>Authentication:</strong> To verify your identity and provide secure access to your account</li>
            <li><strong>User Identification:</strong> To personalize your experience and maintain your account</li>
            <li><strong>Account Functionality:</strong> To provide contest reminders, notifications, and calendar integrations</li>
            <li><strong>Communication:</strong> To send you important updates about the service</li>
            <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our application</li>
            <li><strong>Security:</strong> To protect against unauthorized access and maintain the security of our service</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Storage and Security</h2>
          <p>
            We take the security of your personal data seriously. Your information is stored securely using industry-standard encryption 
            and security measures. We implement appropriate technical and organizational safeguards to protect your data against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p>
            Your data is stored only for as long as necessary to provide you with our services and for legitimate business purposes.
          </p>
        </section>

        <section>
          <h2>5. Data Sharing and Disclosure</h2>
          <p>
            <strong>We do NOT sell, rent, or trade your personal information to third parties.</strong>
          </p>
          <p>We may share your information only in the following circumstances:</p>
          <ul>
            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
            <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our application 
            (e.g., hosting providers, email services) under strict confidentiality agreements</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
            <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property, or that of our users</li>
          </ul>
        </section>

        <section>
          <h2>6. Google API Services User Data Policy</h2>
          <p>
            Our use of information received from Google APIs adheres to the{' '}
            <a 
              href="https://developers.google.com/terms/api-services-user-data-policy" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>, including the Limited Use requirements.
          </p>
          <p>
            We only use the data obtained through Google OAuth for the purposes explicitly stated in this Privacy Policy 
            and will not transfer this data to others unless necessary to provide or improve user-facing features, 
            comply with applicable law, or as part of a merger or acquisition with user notice.
          </p>
        </section>

        <section>
          <h2>7. Your Rights and Choices</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> You can request access to the personal data we hold about you</li>
            <li><strong>Correction:</strong> You can request correction of inaccurate or incomplete data</li>
            <li><strong>Deletion:</strong> You can request deletion of your account and associated personal data</li>
            <li><strong>Withdraw Consent:</strong> You can revoke access permissions granted to our application through your Google account settings</li>
            <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at the email address provided below.
          </p>
        </section>

        <section>
          <h2>8. Third-Party Services</h2>
          <p>
            Our application integrates with third-party services including Google OAuth for authentication. 
            These services have their own privacy policies, and we encourage you to review them:
          </p>
          <ul>
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to maintain your session, remember your preferences, 
            and improve your experience. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2>10. Children's Privacy</h2>
          <p>
            Our service is not intended for children under the age of 13. We do not knowingly collect personal 
            information from children under 13. If you believe we have collected information from a child under 13, 
            please contact us immediately.
          </p>
        </section>

        <section>
          <h2>11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. 
            We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
          </p>
        </section>

        <section>
          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, 
            operational, or regulatory reasons. We will notify you of any material changes by posting the updated 
            policy on this page with a new "Last Updated" date.
          </p>
          <p>
            Your continued use of our service after any changes indicates your acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
            please contact us at:
          </p>
          <p className="contact-info">
            <strong>Email:</strong> <a href="mailto:ayushrajeshmishra20@gmail.com">ayushrajeshmishra20@gmail.com</a>
          </p>
          <p>
            We will respond to your inquiry within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2>14. Governing Law</h2>
          <p>
            This Privacy Policy is governed by and construed in accordance with the laws of India, 
            without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
