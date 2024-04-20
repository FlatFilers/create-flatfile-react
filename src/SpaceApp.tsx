"use client";
import {
  useFlatfile,
  useListener,
  usePlugin,
  useEvent,
  Workbook,
  Space,
  Document,
  Sheet,
  FlatfileProvider,
} from "@flatfile/react";
import { useState } from "react";
import { recordHook } from "@flatfile/plugin-record-hook";
import { sheet } from "./configs/sheet";
import { workbook } from "./configs/workbook";
import { document } from "./configs/document";

export const SpaceApp = ({ publishableKey }: { publishableKey: string }) => {
  return (
    <FlatfileProvider
      publishableKey={publishableKey}
      config={{
        displayAsModal: false,
      }}
    >
      <SpaceConfig />
    </FlatfileProvider>
  );
};

const SpaceConfig = () => {
  const { open, openPortal, closePortal } = useFlatfile();

  const [lastName, setLastName] = useState("Smith");
  const [records, setRecords] = useState([]);

  const toggleButton = () => {
    if (!open) {
      setRecords([]);
      openPortal();
    } else {
      closePortal();
    }
  };

  useListener((listener) => {
    listener.on("**", (event) => {
      console.log("SpaceApp useListener Event => ", {
        topic: event.topic,
        payload: event.payload,
      });
    });
  });

  useListener((client) => {
    client.use(
      recordHook("sheet2", (record) => {
        const firstName = record.get("firstName");
        console.log({ firstName });

        record.set("lastName", "Doe");
        return record;
      })
    );
  }, []);

  usePlugin(
    recordHook("sheet", (record, event) => {
      console.log("recordHook", { event });
      record.set("lastName", lastName);
      return record;
    }),
    [lastName]
  );

  // This will close the Portal instance when you confirm the dialog after the Workbook onSubmit function runs
  useEvent(
    "job:outcome-acknowledged",
    {
      operation: "workbookSubmitAction",
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
      {/*Button to trigger the modal */}
      <div className="centered-sub-navigation">
        <h4>Embed a Flatfile Space. </h4>
        <p>
          <i>
            You can even change the logic of the listener code by updating the
            last name value with the buttons{" "}
          </i>
        </p>
        {records.length > 0 && (
          <div className="success">{records.length} Record Submitted!</div>
        )}
        <button className="contrast" onClick={toggleButton}>
          {open === true ? "Close" : "Open and create new"} Space
        </button>
        <button className="contrast" onClick={() => setLastName("Blue")}>
          Change LastName RecordHook to Blue
        </button>
        <button className="contrast" onClick={() => setLastName("Green")}>
          Change LastName RecordHook to Green
        </button>
      </div>
      <Space
        config={{
          name: "Alex's Space",
          metadata: {
            sidebarConfig: {
              showSidebar: true,
            },
          },
        }}
      >
        <Document config={document} />
        <Workbook
          config={workbook}
          onSubmit={async ({ sheet }) => {
            console.log("on Workbook Submit ", { sheet });
            const { records } = await sheet.allData();
            setRecords(records);
          }}
          onRecordHooks={[
            [
              (record) => {
                record.set("email", "SHEET 1 RECORDHOOKS");
                return record;
              },
            ],
            [
              (record) => {
                record.set("email", "SHEET 2 RECORDHOOKS");
                return record;
              },
            ],
          ]}
        >
          <Sheet
            config={{
              ...sheet,
              slug: "sheet3",
              name: "Sheet 3",
            }}
            onRecordHook={(record) => {
              record.set("email", "SHEET 3 RECORDHOOK");
              return record;
            }}
          />
        </Workbook>
      </Space>
    </div>
  );
};
