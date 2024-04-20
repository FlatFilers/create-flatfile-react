import { Link, Outlet, Route, Routes } from "react-router-dom";
import { WorkbookApp } from "./WorkbookApp";
import { SheetApp } from "./SheetApp";
import { SpaceApp } from "./SpaceApp";

export default function App() {
  const PUBLISHABLE_KEY = "pk_d9GtgYgMAlrylXOXp8ps93fNxgPe4zuD";

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SheetApp publishableKey={PUBLISHABLE_KEY} />} />
        <Route
          path="workbook"
          element={<WorkbookApp publishableKey={PUBLISHABLE_KEY} />}
        />
        <Route
          path="space"
          element={<SpaceApp publishableKey={PUBLISHABLE_KEY} />}
        />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  return (
    <>
      <div className="menu">
        <img
          alt="Flatfile logo"
          height="24"
          src="https://images.ctfassets.net/hjneo4qi4goj/33l3kWmPd9vgl1WH3m9Jsq/13861635730a1b8af383a8be8932f1d6/flatfile-black.svg"
          style={{ marginTop: "5px" }}
          width="104"
        />
        
        <nav>
          <ul>
            <li>
              <Link to="/">Simple Single Sheet</Link>
            </li>
            <li>
              <Link to="/workbook">Workbook Config with Multiple Sheets</Link>
            </li>
            <li>
              <Link to="/space">
                Full Space Config with a Workbook, Document and Multiple Sheets
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <hr />

      <Outlet />
    </>
  );
};

const NoMatch = () => {
  return <>400000004</>;
};
