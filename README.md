### How to install

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following:

```sh
PORT=3000
SESSION_SECRET=my_super_secret_password

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

DATABASE_URL=postgresql://postgres:postgres@postgres:5432

SMTP_GMAIL_EMAIL=
SMTP_GMAIL_PASSWORD=

NODE_ENV=production
```

4. Run `docker-compose up --build -d` to start the server
5. Visit `http://localhost:3000` in your browser

### How to create client ID and secret for GitHub?

1. Go to [GitHub Developer Settings](https://github.com/settings/applications/new) and create a new OAuth application
2. Fill in the details and set the callback URL to `http://localhost:3000/auth/github/callback`

### How to create a Gmail app password?

1. Go to [Google Account](https://myaccount.google.com/)
