import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import { WorkbookApp } from "./WorkbookApp";
import { SheetApp } from "./SheetApp";
import { SpaceApp } from "./SpaceApp";

export default function App() {
  // SET YOUR OWN PUBLISHABLE KEY HERE!!
  // const PUBLISHABLE_KEY = "pk_123456";
  const PUBLISHABLE_KEY = undefined;
  if (PUBLISHABLE_KEY === undefined) {
    return <CheckPublishableKey />;
  } else {
    return (
      <Routes>
        <Route path="/" element={<Layout publishableKey={PUBLISHABLE_KEY} />}>
          <Route
            index
            element={<SheetApp publishableKey={PUBLISHABLE_KEY} />}
          />
          <Route
            path="workbook"
            element={<WorkbookApp publishableKey={PUBLISHABLE_KEY} />}
          />
          <Route
            path="space"
            element={<SpaceApp publishableKey={PUBLISHABLE_KEY} />}
          />
        </Route>
      </Routes>
    );
  }
}

const Layout = ({ publishableKey }: { publishableKey: string }) => {
  return (
    <>
      <div className="menu">
        <div className="top-menu">
          <img
            alt="Flatfile logo"
            src="https://images.ctfassets.net/hjneo4qi4goj/33l3kWmPd9vgl1WH3m9Jsq/13861635730a1b8af383a8be8932f1d6/flatfile-black.svg"
            style={{ marginTop: "5px" }}
          />
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "active" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/"
              >
                Simple Sheet Component
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "active" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/workbook"
              >
                Workbook Component with Multiple Sheets
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "active" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
                to="/space"
              >
                Advanced Space Component Configuration
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <hr />
      {publishableKey === "pk_123456" ? (
        <>Houston we have a problem</>
      ) : (
        <Outlet />
      )}
    </>
  );
};

const CheckPublishableKey = () => {
  return (
    <>
      <div className="menu">
        <div className="top-menu">
          <img
            alt="Flatfile logo"
            src="https://images.ctfassets.net/hjneo4qi4goj/33l3kWmPd9vgl1WH3m9Jsq/13861635730a1b8af383a8be8932f1d6/flatfile-black.svg"
            style={{ marginTop: "5px" }}
          />
        </div>
      </div>
      <hr />
      <div className="content">
        <h2>Houston we have a problem...</h2>
        <p>
          Looks like you need to put in your{" "}
          <pre className="inline">publishable key</pre>. Sign in to your{" "}
          <a href="https://platform.flatfile.com/dashboard/keys-and-secrets">
            Flatfile Dashboard
          </a>{" "}
          and find it under API Keys & Secrets.
        </p>
      </div>
    </>
  );
};
