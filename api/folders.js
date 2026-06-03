import express from "express";
const router = express.Router();
export default router;

import { getFolderByIdIncludingFiles, getFolders } from "#db/queries/folders";

/** GET /folders sends array of all folders */
router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

/** param router to reuse logic for id parameter*/
router.param("id", async (req, res, next, id) => {
  const folder = await getFolderByIdIncludingFiles(id);
  if (!folder) return res.status(404).send("Folder not found.");

  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});
