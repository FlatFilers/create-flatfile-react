import { Flatfile } from "@flatfile/api";

export const sheet: Flatfile.SheetConfig = {
  name: "Sheet",
  slug: "sheet",
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
      key: "color",
      type: "string",
      label: "Color",
    },
    {
      key: "email",
      type: "string",
      label: "Email",
    },
  ],
};
