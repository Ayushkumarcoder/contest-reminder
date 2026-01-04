import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="legal-page-container" style={{ flex: 1 }}>
      <div className="legal-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: January 4, 2026</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            Welcome to Contest Reminder. By accessing or using our web application ("Service"), you agree to be bound by these 
            Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Contest Reminder 
            ("we," "us," or "our"). Your use of the Service signifies your acceptance of these Terms and our Privacy Policy.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Service after any modifications 
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            Contest Reminder is a web application that provides users with notifications and reminders for competitive 
            programming contests from various platforms. The Service includes features such as:
          </p>
          <ul>
            <li>Contest tracking from multiple competitive programming platforms</li>
            <li>Personalized contest reminders and notifications</li>
            <li>Calendar integration for contest scheduling</li>
            <li>User authentication via Google OAuth</li>
            <li>Customizable notification preferences</li>
          </ul>
        </section>

        <section>
          <h2>3. User Accounts and Authentication</h2>
          <h3>3.1 Account Creation</h3>
          <p>
            To use certain features of the Service, you must create an account by authenticating through Google OAuth. 
            By creating an account, you represent that:
          </p>
          <ul>
            <li>You are at least 13 years of age</li>
            <li>You have the legal capacity to enter into these Terms</li>
            <li>The information you provide is accurate and complete</li>
            <li>You will maintain the accuracy of such information</li>
          </ul>

          <h3>3.2 Account Security</h3>
          <p>
            You are responsible for maintaining the security of your account and for all activities that occur under your account. 
            You agree to:
          </p>
          <ul>
            <li>Safeguard your account credentials</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Accept responsibility for all activities conducted through your account</li>
          </ul>
        </section>

        <section>
          <h2>4. Permitted Use</h2>
          <h3>4.1 License</h3>
          <p>
            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access 
            and use the Service for personal, non-commercial purposes.
          </p>

          <h3>4.2 Restrictions</h3>
          <p>You agree NOT to:</p>
          <ul>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Violate any laws, regulations, or third-party rights</li>
            <li>Transmit any viruses, malware, or other harmful code</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Attempt to gain unauthorized access to any portion of the Service</li>
            <li>Scrape, crawl, or use automated means to access the Service without permission</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Use the Service to spam, harass, or harm others</li>
            <li>Impersonate any person or entity</li>
            <li>Collect or store personal data about other users without consent</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property Rights</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Contest Reminder and are protected 
            by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
            republish, download, store, or transmit any of the material on our Service, except as permitted by these Terms.
          </p>
        </section>

        <section>
          <h2>6. Third-Party Services</h2>
          <p>
            The Service integrates with third-party services, including Google OAuth for authentication and various 
            competitive programming platforms for contest data. We are not responsible for:
          </p>
          <ul>
            <li>The availability, accuracy, or content of third-party services</li>
            <li>Third-party terms of service or privacy policies</li>
            <li>Any damages or losses arising from your use of third-party services</li>
          </ul>
          <p>
            Your use of third-party services is governed by their respective terms and conditions.
          </p>
        </section>

        <section>
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            <strong>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, 
            EITHER EXPRESS OR IMPLIED.</strong>
          </p>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul>
            <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
            <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR AVAILABILITY OF THE SERVICE</li>
            <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
            <li>WARRANTIES REGARDING THE QUALITY OR ACCURACY OF CONTEST INFORMATION</li>
          </ul>
          <p>
            We do not warrant that:
          </p>
          <ul>
            <li>The Service will meet your specific requirements</li>
            <li>Contest reminders will always be delivered on time or at all</li>
            <li>Any errors or defects will be corrected</li>
            <li>The Service is free from viruses or other harmful components</li>
          </ul>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CONTEST REMINDER, ITS OFFICERS, 
            DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE 
            DAMAGES, INCLUDING BUT NOT LIMITED TO:</strong>
          </p>
          <ul>
            <li>Loss of profits, data, use, or goodwill</li>
            <li>Service interruption or failure</li>
            <li>Missed contest deadlines or registrations</li>
            <li>Errors or inaccuracies in contest information</li>
            <li>Unauthorized access to or alteration of your data</li>
            <li>Any damages arising from your use of or inability to use the Service</li>
          </ul>
          <p>
            <strong>OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED 
            THE AMOUNT YOU PAID US, IF ANY, IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</strong>
          </p>
          <p>
            Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of 
            liability for incidental or consequential damages. Accordingly, some of the limitations may not apply to you.
          </p>
        </section>

        <section>
          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Contest Reminder and its officers, directors, employees, 
            agents, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees 
            (including reasonable attorneys' fees) arising from:
          </p>
          <ul>
            <li>Your use or misuse of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
            <li>Your violation of any applicable laws or regulations</li>
          </ul>
        </section>

        <section>
          <h2>10. Termination</h2>
          <h3>10.1 Termination by You</h3>
          <p>
            You may terminate your account at any time by discontinuing use of the Service and requesting account deletion 
            through the contact information provided in our Privacy Policy.
          </p>

          <h3>10.2 Termination by Us</h3>
          <p>
            We reserve the right to suspend or terminate your access to the Service immediately, without prior notice or 
            liability, for any reason, including but not limited to:
          </p>
          <ul>
            <li>Violation of these Terms</li>
            <li>Fraudulent, abusive, or illegal activity</li>
            <li>Extended periods of inactivity</li>
            <li>Technical or security reasons</li>
            <li>Discontinuation of the Service</li>
          </ul>

          <h3>10.3 Effect of Termination</h3>
          <p>
            Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by 
            their nature should survive termination shall survive, including but not limited to ownership provisions, 
            warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section>
          <h2>11. Privacy and Data Protection</h2>
          <p>
            Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. 
            Please review our <a href="/privacy-policy">Privacy Policy</a> to understand our data collection and usage practices.
          </p>
        </section>

        <section>
          <h2>12. Modifications to the Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or 
            without notice. We shall not be liable to you or any third party for any modification, suspension, or 
            discontinuation of the Service.
          </p>
        </section>

        <section>
          <h2>13. Governing Law and Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its 
            conflict of law provisions.
          </p>
          <p>
            Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive 
            jurisdiction of the courts located in India. You consent to the personal jurisdiction of such courts.
          </p>
        </section>

        <section>
          <h2>14. Dispute Resolution</h2>
          <p>
            In the event of any dispute, controversy, or claim arising out of or relating to these Terms or the Service, 
            the parties agree to first attempt to resolve the dispute through good-faith negotiations.
          </p>
          <p>
            If the dispute cannot be resolved through negotiation within thirty (30) days, the parties may pursue other 
            legal remedies available under applicable law.
          </p>
        </section>

        <section>
          <h2>15. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions 
            shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary 
            to make it valid and enforceable.
          </p>
        </section>

        <section>
          <h2>16. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Contest Reminder 
            regarding the Service and supersede all prior agreements and understandings, whether written or oral.
          </p>
        </section>

        <section>
          <h2>17. Waiver</h2>
          <p>
            No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term. 
            Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
          </p>
        </section>

        <section>
          <h2>18. Assignment</h2>
          <p>
            You may not assign or transfer these Terms or your rights hereunder, in whole or in part, without our prior 
            written consent. We may assign these Terms at any time without notice or consent.
          </p>
        </section>

        <section>
          <h2>19. Contact Information</h2>
          <p>
            If you have any questions, concerns, or complaints regarding these Terms of Service, please contact us at:
          </p>
          <p className="contact-info">
            <strong>Email:</strong> <a href="mailto:ayushrajeshmishra20@gmail.com">ayushrajeshmishra20@gmail.com</a>
          </p>
          <p>
            We will make reasonable efforts to respond to your inquiry in a timely manner.
          </p>
        </section>

        <section>
          <h2>20. Acknowledgment</h2>
          <p>
            BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, AND AGREE 
            TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE THE SERVICE.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
