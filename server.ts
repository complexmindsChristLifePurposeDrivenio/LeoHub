import express from "express";
import path from "path";
import { handleApiRequest } from "./server/apiRouter";

const app = express();
const port = process.env.PORT || 3000;

app.use(async (req, res, next) => {
  const pathname = req.path;
  if (pathname.startsWith("/api/")) {
    const handled = await handleApiRequest(req, res, pathname);
    if (handled) return;
  }
  next();
});

// Serve static assets from dist in production
const distPath = path.resolve(process.cwd(), "dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Leonida Creator Hub server running on port ${port}`);
});
