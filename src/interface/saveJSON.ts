import fs from "fs";
import path from "path";

const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

export const writeJSONToFile = (
  filename: string,
  data: { name: string; id: string }[]
) => {
  const filePath = path.join(__dirname, "../../data", filename);

  // Ensure the directory exists
  ensureDirectoryExistence(filePath);

  // Write data to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
