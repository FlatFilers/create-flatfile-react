import { Flatfile } from "@flatfile/api";

export const sheet2: Flatfile.SheetConfig = {
  name: "Sheet 2",
  slug: "sheet2",
  fields: [
    {
      key: "firstName",
      type: "string",
      label: "First Name",
    },
    {
      key: "lastName",
      type: "string",
      label: "Last Name",
    },
    {
      key: "email",
      type: "string",
      label: "Email",
    },
  ],
};
