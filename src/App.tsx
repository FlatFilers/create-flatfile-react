import { ISpace, makeTheme, useSpace } from "@flatfile/react";
import React, { useState } from "react";
import { config } from "./config";
import { listener } from "./listener";

const spaceProps: ISpace = {
  name: "Embedded Space",
  // to test locally add your local vars here
  publishableKey: "pk_FKfafGxzQRg2tuwpAzz7oO3xOCHapTJo",
  workbook: config,
  themeConfig: makeTheme({ primaryColor: "#546a76", textColor: "#fff" }),
  sidebarConfig: {
    showDataChecklist: false,
    showSidebar: false,
  },
  listener: listener,
};

export default function App() {
  const [showSpace, setShowSpace] = useState(false);
  const space = useSpace({
    ...spaceProps,
    closeSpace: {
      operation: "contacts:submit",
      onClose: () => setShowSpace(false),
    },
  });

  return (
    <div style={{ padding: "16px" }}>
      <button
        onClick={() => {
          setShowSpace(!showSpace);
        }}
      >
        {showSpace === true ? "Close" : "Open"} space
      </button>
      {showSpace && space}
    </div>
  );
}
