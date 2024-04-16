import { FlatfileProvider } from "@flatfile/react";
import { workbook } from "./workbook";
import { useFlatfile, Workbook } from "@flatfile/react";

export default function Home() {
  const PUBLISHABLE_KEY = "pk_d9GtgYgMAlrylXOXp8ps93fNxgPe4zuD";

  const App = () => {
    const { open, openPortal, closePortal } = useFlatfile();

    return (
      <div className="content">
        <h2>
          <code>&lt;Flatfile /&gt;</code>
        </h2>
        <p>Embed Flatfile in just a few lines of code.</p>
        {/*Button to trigger the modal */}
        <div>
          <button
            className="contrast"
            onClick={() => {
              open ? closePortal() : openPortal();
            }}
          >
            {open === true ? "Close" : "Open and create new"} Space
          </button>
        </div>

        <Workbook
          config={workbook}
          onSubmit={async (sheet) => {
            console.log("on Workbook Submit ", { sheet });
          }}
          onRecordHooks={[
            [
              (record) => {
                record.set("lastName", "Rock");
                return record;
              },
            ],
          ]}
        ></Workbook>
      </div>
    );
  };

  return (
    <FlatfileProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </FlatfileProvider>
  );
}
