import {
    pgTable,
    timestamp,
    varchar,
    jsonb,
    serial,
    integer,
} from "drizzle-orm/pg-core";

// Upcoming matches - stores upcoming matches fetched from external API
export const upcomingMatches = pgTable("upcoming_matches", {
    id: serial("id").primaryKey(),
    externalMatchId: varchar("external_match_id", { length: 255 }).notNull(), // Match ID from external API
    homeTeam: varchar("home_team", { length: 255 }).notNull(),
    awayTeam: varchar("away_team", { length: 255 }).notNull(),
    homeLogo: varchar("home_logo", { length: 500 }),
    awayLogo: varchar("away_logo", { length: 500 }),
    matchDate: timestamp("match_date").notNull(),
    matchTime: varchar("match_time", { length: 10 }), // e.g., "12:30"
    apiData: jsonb("api_data"), // Store full API response for reference
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Team selections - stores a user's selection of 11 players for a match
// Match and player data comes from external API
export const teamSelections = pgTable("team_selections", {
    id: serial("id").primaryKey(),
    walletAddress: varchar("wallet_address", { length: 255 }).notNull(),
    matchId: varchar("match_id", { length: 255 }).notNull(), // Match ID from external API
    playerIds: jsonb("player_ids").notNull(), // Array of 11 player IDs from external API
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Users table - stores user accounts with Google OAuth
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    image: varchar("image", { length: 500 }),
    googleId: varchar("google_id", { length: 255 }).notNull().unique(),
    walletAddress: varchar("wallet_address", { length: 255 })
        .notNull()
        .unique(),
    encryptedPrivateKey: varchar("encrypted_private_key", {
        length: 500,
    }).notNull(), // Encrypted private key
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Per-user points balance
export const userPoints = pgTable("user_points", {
    id: serial("id").primaryKey(),
    walletAddress: varchar("wallet_address", { length: 255 }).notNull(),
    points: integer("points").default(0).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
