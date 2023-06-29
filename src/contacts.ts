// @ts-nocheck
import { Flatfile } from "@flatfile/api";

export const contacts: Pick<
  Flatfile.CreateWorkbookConfig,
  "name" | "sheets" | "actions"
> = {
  name: "Employees workbook",
  sheets: [
    {
      slug: "contacts",
      name: "Contacts",
      fields: [
        {
          key: "firstName",
          type: "string",
          label: "First Name",
          constraints: [{ "type": "required" }]
        },
        {
          key: "lastName",
          type: "string",
          label: "Last Name",
        },
        {
          key: "fullName",
          type: "string",
          label: "Full Name",
          description: 'If not provided, the system will generate this is from First & Last name.',
        },
        {
          key: "email",
          type: "string",
          label: "Email",
          description: 'Please enter your email',
          constraints: [{ "type": "unique" }]
        },
        {
          key: "phone",
          type: "string",
          label: "Phone Number",
        },
        {
          key: "date",
          type: "string",
          label: "Date",
        },
        {
          key: "country",
          type: "string",
          label: "Country",
        },
        {
          key: "zipCode",
          type: "string",
          label: "Zip Code",
        },
        {
          key: "subscriber",
          label: "Subscriber?",
          type: "boolean",
        },
        {
          key: "type",
          label: "Deal Status",
          type: "enum",
          config: {
            options: [
              { value: "new", label: "New" },
              { value: "interested", label: "Interested" },
              { value: "meeting", label: "Meeting" },
              { value: "opportunity", label: "Opportunity" },
              { value: "unqualified", label: "Not a fit" }
            ]
          },
          constraints: [{ "type": "required" }]
        },
      ]
    }
  ],
  actions: [
    {
      label: "Submit",
      operation: "contacts:submit",
      description: "Would you like to submit your workbook?",
      mode: "foreground",
      primary: true,
      confirm: true,
    },
  ],
};

