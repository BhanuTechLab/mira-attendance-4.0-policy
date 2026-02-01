
import { GoogleGenAI, Type } from "@google/genai";
import { PolicyData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const USER_POLICY_TEXT = `
 Information We Collect
We collect only the information necessary to provide attendance and authentication services.

1.1 Personal Information
Full name, Email address, Phone number, Employee / Student ID, Profile photograph (if required by organization).

1.2 Attendance & Usage Data
Check-in and check-out timestamps, Attendance history and logs, Organization or department details, Device information (model, OS, browser).

1.3 Biometric / Face Recognition Data
If face recognition is enabled: Facial feature data (converted into encrypted numerical templates), Face images used only for enrollment and verification.
Important: Raw face images are not shared with third parties. Biometric data is processed only with user or organizational consent.

1.4 Technical Data
IP address, Log files, App performance and error logs.

 How We Use Your Information
We use collected information to: Register and manage user accounts, Record and verify attendance, Authenticate users securely, Improve system accuracy and performance, Provide customer support, Ensure security and prevent misuse. We do not sell, rent, or trade your personal or biometric data.

 Cookies and Tracking Technologies
Our website may use cookies to: Improve user experience, Analyze website traffic, Maintain session security. You may disable cookies in your browser settings, but some features may not work properly.

 Legal Basis for Processing
We process personal data based on: User consent, Organizational authorization, Legal compliance, Legitimate business interests.

 Data Sharing and Disclosure
We may share data only in the following cases: With trusted service providers (cloud hosting, analytics), When required by law or government authorities, To protect system security and legal rights. All third parties are required to follow strict data protection standards.

 Data Storage & Retention
Data is stored securely using industry-standard practices. Attendance data is retained as per organizational policy. Biometric data is deleted upon account removal or consent withdrawal.

 Data Security
We use appropriate security measures including: Encryption, Access control, Secure servers, Regular security monitoring. However, no digital system is 100% secure, and we cannot guarantee absolute protection.

 User Rights
You have the right to: Access your personal data, Correct inaccurate information, Request deletion of your data, Withdraw consent (where applicable). Requests can be made using the contact details below.

 Children’s Privacy
Mira Attendance is not intended for children under 13 years of age. We do not knowingly collect personal data from children without parental or institutional consent.

 Changes to This Privacy Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.

 Contact Information
Project Name: Mira Attendance
Email: support@yourdomain.com
Website: https://yourdomain.com
`;

export const fetchPrivacyPolicy = async (): Promise<PolicyData> => {
  const prompt = `
    Format the following Privacy Policy text for 'Mira Attendance 4.0' into a structured JSON. 
    Maintain the specific wording and numbering provided.
    Map the text into sections with unique IDs, titles, and content.
    For each section, select a highly relevant Font Awesome icon class (e.g., 'fas fa-fingerprint' for biometric data).
    
    POLICY TEXT:
    ${USER_POLICY_TEXT}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lastUpdated: { type: Type.STRING },
            version: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                  icon: { type: Type.STRING }
                },
                required: ["id", "title", "content", "icon"]
              }
            }
          },
          required: ["lastUpdated", "version", "sections"]
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as PolicyData;
  } catch (error) {
    console.error("Error generating privacy policy:", error);
    return {
      lastUpdated: new Date().toLocaleDateString(),
      version: "4.0.0",
      sections: [
        { id: "info-collect", title: "1. Information We Collect", content: "We collect only the information necessary to provide attendance and authentication services...\n\n1.1 Personal Information: Full name, Email, ID, etc.\n1.2 Attendance Data: Timestamps, history.\n1.3 Biometrics: Encrypted facial templates if enabled.\n1.4 Technical Data: IP, logs.", icon: "fas fa-database" },
        { id: "how-use", title: "2. How We Use Your Information", content: "We use information to manage accounts, verify attendance, and ensure security. We do not sell your data.", icon: "fas fa-cogs" },
        { id: "cookies", title: "3. Cookies", content: "We use cookies to improve experience and security.", icon: "fas fa-cookie-bite" },
        { id: "contact", title: "11. Contact Information", content: "Project: Mira Attendance\nEmail: support@yourdomain.com\nWebsite: https://yourdomain.com", icon: "fas fa-address-book" }
      ]
    };
  }
};
