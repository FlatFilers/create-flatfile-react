import { Flatfile } from "@flatfile/api";
import { sheet2 } from "./sheet2";
import { sheet } from "./sheet";

export const workbook: Flatfile.CreateWorkbookConfig = {
  name: "All Data",
  labels: ["pinned"],
  namespace: "portal",
  sheets: [sheet, sheet2],
};
