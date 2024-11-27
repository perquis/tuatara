declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV?: "development" | "production";
      SESSION_SECRET?: string;
      GITHUB_CLIENT_ID?: string;
      GITHUB_CLIENT_SECRET?: string;
      GITHUB_CALLBACK_URL?: string;
      SMTP_GMAIL_EMAIL?: string;
      SMTP_GMAIL_PASSWORD?: string;
    }
  }
}

export {};
