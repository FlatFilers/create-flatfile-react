import { useState } from "react";
import { ISpace, initializeFlatfile } from "@flatfile/react";
import { workbook } from "./workbook";
import { listener } from "./listeners/simple";


export default function App() {
  const spaceProps: ISpace = {
    name: "Embedded Space",
    publishableKey: "YOUR_PRIVATE_KEY",
    environmentId: "YOUR_ENVIRONMENT_ID",
    workbook,
    listener,
    sidebarConfig: {
      showSidebar: false,
    },
    themeConfig: {
      root: {
        primaryColor: "red",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
      },
    },
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
  };

  const [showSpace, setShowSpace] = useState(false);
  const { Space, OpenEmbed } = initializeFlatfile(spaceProps);

  const onOpenSpace = async () => {
    setShowSpace(!showSpace);
    await OpenEmbed();
  }

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
          onClick={onOpenSpace}
        >
          {showSpace === true ? "Close" : "Open and create new"} Space
        </button>
        {showSpace && <Space />}
      </div>
    </div>
  );
}