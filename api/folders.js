import express from "express";
const router = express.Router();
export default router;

import { createFile } from "#db/queries/files";
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

/** POST /folders/:id/files
Sends 404 error message if folder doesn't exist
Sends 400 if request body is not provided
Sends 400 if request body is missing required fields
Creates a new file related to the specified folder and sends the file back with status 201
*/
router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body must be provided.");

  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send("Request body requires: name, size");

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
