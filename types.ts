
export interface PrivacySection {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface PolicyData {
  lastUpdated: string;
  version: string;
  sections: PrivacySection[];
}
