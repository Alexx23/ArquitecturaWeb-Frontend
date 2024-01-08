import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons/faXmarkCircle";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons/faCalendarWeek";
import { faTicket } from "@fortawesome/free-solid-svg-icons/faTicket";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import "flowbite/dist/flowbite.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import UserProvider from "./context/UserContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./utils/DarkMode";

library.add(
  faAngleLeft,
  faCircleCheck,
  faXmarkCircle,
  faHouse,
  faCalendarWeek,
  faTicket,
  faUsers,
  faPlus
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <UserProvider>
      <main className="bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </main>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
