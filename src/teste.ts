import { exec } from "child_process";

const pythonScriptPath = "./python/generate_data.py";

exec(`python3 ${pythonScriptPath}`, (error: any, stdout: any, stderr: any) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  console.log(`Output from Python script: ${stdout}`);
});
