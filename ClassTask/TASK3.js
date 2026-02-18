const fs = require("fs/promises");
const path = require("path");

const SOURCE_DIR = path.join(__dirname, "uploads");
const BACKUP_DIR = path.join(__dirname, "backup");
const LOG_FILE = path.join(__dirname, "backup.log");

const DAYS_7 = 7 * 24 * 60 * 60 * 1000;

// log helper
async function log(message) {
  const logMsg = `${new Date().toISOString()} - ${message}\n`;
  await fs.appendFile(LOG_FILE, logMsg);
}

// missing directories handling
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    await log(`Created directory: ${dir}`);
  }
}

async function backupAndCleanup() {
  try {
    await ensureDir(SOURCE_DIR);
    await ensureDir(BACKUP_DIR);

    const files = await fs.readdir(SOURCE_DIR);

    for (const file of files) {
      const filePath = path.join(SOURCE_DIR, file);
      const stat = await fs.stat(filePath);

      // skip directories
      if (stat.isDirectory()) continue;

      const timestamp = Date.now();
      const backupFile = `${timestamp}-${file}`;
      const backupPath = path.join(BACKUP_DIR, backupFile);

      // copy file
      await fs.copyFile(filePath, backupPath);
      await log(`Backed up: ${file} → ${backupFile}`);

      // delete if older than 7 days
      const age = Date.now() - stat.mtimeMs;
      if (age > DAYS_7) {
        await fs.unlink(filePath);
        await log(`Deleted old file: ${file}`);
      }
    }
  } catch (err) {
    await log(`ERROR: ${err.message}`);
  }
}

backupAndCleanup();
