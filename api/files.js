import express from "express";
const router = express.Router();
export default router;

import { getFilesIncludingFolderName } from "#db/queries/files";

/**GET /files sends array of all files
 * the name of the containing folder should be included as folder_name
 */
router.get("/", async (req, res) => {
  const files = await getFilesIncludingFolderName();
  res.send(files);
});
