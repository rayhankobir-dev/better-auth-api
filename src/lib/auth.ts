import { betterAuth } from "better-auth";
import nodemailer from "nodemailer";
import {
  magicLink,
  emailOTP,
  openAPI,
  multiSession,
  twoFactor,
} from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/index.js";
import {
  account,
  session,
  user,
  verification,
  twoFactor as twoFactorSchema,
  rateLimit as rateLimitSchema,
} from "../db/schema";
import dotenv from "dotenv";
dotenv.config();

export const auth = betterAuth({
  appName: "admin-studio",
  trustedOrigins: [String(process.env.FRONTEND_URL)],
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    storage: "database",
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
      twoFactor: twoFactorSchema,
      rateLimit: rateLimitSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail(
        user.email,
        "Reset your password",
        `Click the link to reset your password: ${url}`
      );
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  socialProviders: {
    google: {
      accessType: "offline",
      prompt: "select_account+consent",
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    },
  },
  plugins: [
    openAPI(),
    multiSession({ maximumSessions: 3 }),
    magicLink({
      sendMagicLink: async ({ url }) => {
        await sendEmail("rayhankobir793@gmail.com", "Magic Link", url);
      },
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        await sendEmail(email, "OTP", otp);
      },
    }),
    twoFactor({
      issuer: "admin-studio",
      skipVerificationOnEnable: true,

      otpOptions: {
        digits: 6,
        async sendOTP({ user, otp }) {
          const text = `Your 2FA OTP is: ${otp}`;
          await sendEmail(user.email, "OTP", text);
        },
      },
      totpOptions: {
        digits: 6,
        period: 30,
        disable: false,
        backupCodes: {
          amount: 10,
          length: 10,
          customBackupCodesGenerate: () => ["123456", "1234567", "12345678"],
          storeBackupCodes: "plain",
        },
      },
    }),
  ],
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const text = `Click the link to verify your email: ${url}`;
      sendEmail(user.email, "Verify your email", text);
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
    disableSessionRefresh: true,
    expiresIn: 30 * 24 * 60 * 60,
    storeSessionInDatabase: true,
    preserveSessionInDatabase: true,
  },
});

export async function sendEmail(email: string, subject: string, text: string) {
  console.log(email, subject, text);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: "rayhankobir793@gmail.com",
    subject: "Magic Link",
    text,
  });
}
