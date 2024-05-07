import { FlatfileProvider, useFlatfile, Workbook } from "@flatfile/react";
import { workbook } from "./configs/workbook";
import Button from "./utils/Button";

export const WorkbookApp = ({ publishableKey }: { publishableKey: string }) => {
  return (
    <FlatfileProvider publishableKey={publishableKey}>
      <WorkbookConfig />
    </FlatfileProvider>
  );
};

const WorkbookConfig = () => {
  const { open, openPortal, closePortal } = useFlatfile();

  return (
    <div className="content">
      {/*Button to trigger the modal */}
      <div>
      <h2>
          The <pre className="inline">{`<Workbook />`}</pre> Component
        </h2>
        <p>Embed a Flatfile Workbook in just a few lines of code.</p>
        <Button
          onClick={() => {
            open ? closePortal() : openPortal();
          }}
        >
          {open === true ? "Close" : "Open"} Portal
        </Button>
      </div>

      <Workbook
        config={workbook}
        onSubmit={async (sheet) => {
          console.log("on Workbook Submit ", { sheet });
        }}
        onRecordHooks={[
          [
            "sheet",
            (record) => {
              record.set("lastName", "Rock");
              return record;
            },
          ],
          [
            "sheet1",
            (record) => {
              record.set("lastName", "Smith");
              return record;
            },
          ],
        ]}
      />
    </div>
  );
};
