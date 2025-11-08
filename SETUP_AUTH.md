# User Authentication Setup

This document explains the user authentication system that has been implemented.

## Features Implemented

1. **Google OAuth Sign-In**: Users can sign in with their Google account
2. **Automatic Wallet Creation**: A new Ethereum wallet is automatically created for each new user
3. **Encrypted Private Key Storage**: Private keys are encrypted using AES-256-CBC before storing in the database
4. **Session-Based Authentication**: Uses NextAuth.js for session management
5. **Protected Routes**: Middleware protects all routes except sign-in and auth endpoints
6. **Profile Integration**: Profile page displays real user data from the session

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
# Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
# Get these from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Encryption Key (64 hex characters = 32 bytes for AES-256)
# Generate with: openssl rand -hex 32
ENCRYPTION_KEY=your-64-character-hex-encryption-key

# RapidAPI (for match data)
RAPIDAPI_KEY=your-rapidapi-key
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
    - `http://localhost:3000/api/auth/callback/google` (for development)
    - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret to your `.env.local` file

## Database Migration

Run the database migration to create the users table:

```bash
npm run db:push
```

This will create the `users` table with the following schema:

-   `id` (serial primary key)
-   `email` (unique, not null)
-   `name` (nullable)
-   `image` (nullable)
-   `google_id` (unique, not null)
-   `wallet_address` (unique, not null)
-   `encrypted_private_key` (not null)
-   `created_at` (timestamp)
-   `updated_at` (timestamp)

## How It Works

1. **User Signs In**: User clicks "Sign in with Google" on `/signin` page
2. **OAuth Flow**: NextAuth handles the Google OAuth flow
3. **User Creation**: On first sign-in, the system:
    - Generates a new Ethereum wallet using ethers.js
    - Encrypts the private key using AES-256-CBC
    - Stores user data and encrypted private key in the database
4. **Session Management**: NextAuth creates a JWT session with user data
5. **Protected Routes**: Middleware checks for authentication on all routes except `/signin` and `/api/auth/*`
6. **Profile Display**: Profile page fetches user data from the session and displays it

## API Endpoints

### `/api/auth/[...nextauth]`

-   Handles all NextAuth authentication routes
-   Automatically creates wallets for new users
-   Manages sessions

### `/api/points`

-   **GET**: Returns the authenticated user's points (uses session wallet)
-   **POST**: Updates the authenticated user's points (uses session wallet)

### `/api/user`

-   **GET**: Returns the authenticated user's profile data

## Security Notes

1. **Private Key Encryption**: Private keys are encrypted using AES-256-CBC before storage
2. **Environment Variables**: Never commit `.env.local` to version control
3. **Encryption Key**: The `ENCRYPTION_KEY` must be 64 hex characters (32 bytes)
4. **Session Security**: NextAuth uses JWT tokens stored in HTTP-only cookies

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. You should be redirected to `/signin` if not authenticated
4. Click "Sign in with Google"
5. Complete the OAuth flow
6. You should be redirected to `/home`
7. Navigate to `/profile` to see your user data and wallet address

## Troubleshooting

-   **"ENCRYPTION_KEY must be set"**: Make sure you've set the `ENCRYPTION_KEY` environment variable (64 hex characters)
-   **"Unauthorized" errors**: Make sure you're signed in and the session is valid
-   **Database errors**: Make sure you've run `npm run db:push` to create the users table
-   **OAuth errors**: Check that your Google OAuth credentials are correct and redirect URIs are configured
