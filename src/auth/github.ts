import "dotenv/config";
import { Router } from "express";
import passport from "passport";
import GitHubStrategy from "passport-github";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = {
          githubId: profile.id,
          username: profile.username!,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
        };

        done(null, user);
      } catch (error) {
        console.log({ error });
        done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export const githubOAuth2 = Router();

githubOAuth2.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
githubOAuth2.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (_req, res) => {
    res.json({
      success: true,
      message: "Authenticated by GitHub",
    });
  }
);
