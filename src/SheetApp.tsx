import {
  FlatfileProvider,
  Sheet,
  useEvent,
  useFlatfile,
} from "@flatfile/react";
import { sheet } from "./configs/sheet";
import Button from "./utils/Button";

export const SheetApp = ({ publishableKey }: { publishableKey: string }) => {
  return (
    <FlatfileProvider publishableKey={publishableKey}>
      <SheetConfig />
    </FlatfileProvider>
  );
};

const SheetConfig = () => {
  const { open, openPortal, closePortal } = useFlatfile();

  // This will close the Portal instance when you confirm the dialog after the Workbook onSubmit function runs
  useEvent(
    "job:outcome-acknowledged",
    {
      operation: `sheetSubmitAction-${sheet.slug}`,
      status: "complete",
    },
    async (event) => {
      // any logic related to the event needed for closing the event
      console.log({ event });
      // close the portal iFrame window
      closePortal();
    }
  );

  return (
    <div className="content">
      <div>
        <h2>
          The <pre className="inline">{`<Sheet />`}</pre> Component
        </h2>
        <p>Embed a Flatfile Sheet in just a few lines of code.</p>
        {/*Button to trigger the modal */}
        <Button
          onClick={() => {
            open ? closePortal() : openPortal();
          }}
        >
          {open === true ? "Close" : "Open"} Portal
        </Button>
      </div>

      <Sheet
        config={sheet}
        onSubmit={async (sheet) => {
          console.log("on Workbook Submit ", { sheet });
        }}
        onRecordHook={(record) => {
          record.set("lastName", "Rock");
          return record;
        }}
      />
    </div>
  );
};
