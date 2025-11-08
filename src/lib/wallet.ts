import { ethers } from "ethers";
import crypto from "crypto";

// Encryption key must be 64 hex characters (32 bytes) for AES-256
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
    throw new Error(
        "ENCRYPTION_KEY environment variable must be set to a 64-character hex string (32 bytes)"
    );
}

const IV_LENGTH = 16; // For AES, this is always 16

/**
 * Encrypts a private key using AES-256-CBC
 */
export function encryptPrivateKey(privateKey: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(ENCRYPTION_KEY.slice(0, 32), "hex"),
        iv
    );
    let encrypted = cipher.update(privateKey);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

/**
 * Decrypts an encrypted private key
 */
export function decryptPrivateKey(encryptedData: string): string {
    const parts = encryptedData.split(":");
    const iv = Buffer.from(parts.shift() || "", "hex");
    const encryptedText = Buffer.from(parts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(ENCRYPTION_KEY.slice(0, 32), "hex"),
        iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

/**
 * Generates a new Ethereum wallet
 */
export function generateWallet(): {
    address: string;
    privateKey: string;
} {
    const wallet = ethers.Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
    };
}
