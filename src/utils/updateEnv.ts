import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

export type EnvKey = "CLIENT_ID" | "CLIENT_SECRET" | "TOKEN";

export const updateEnv = (value: string, key: EnvKey): void => {
  const envPath = path.join(__dirname, "../../.env");

  if (!fs.existsSync(envPath)) {
    throw new Error(".env file not found");
  }

  const envFile = fs.readFileSync(envPath, "utf8");

  if (!value) {
    throw new Error("Invalid value: Value cannot be empty or null");
  }

  // Check if key already exists in .env
  const keyValueRegex = new RegExp(`^${key}=(.*)$`, "m");
  const match = envFile.match(keyValueRegex);

  let updatedEnvFile;
  if (match) {
    // If key exists, replace it
    updatedEnvFile = envFile.replace(keyValueRegex, `${key}=${value}`);
  } else {
    // If key doesn't exist, append it
    updatedEnvFile = `${envFile}\n${key}=${value}\n`;
  }

  fs.writeFileSync(envPath, updatedEnvFile);
};
