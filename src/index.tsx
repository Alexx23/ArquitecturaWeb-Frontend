import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons/faXmarkCircle";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons/faCalendarWeek";
import { faTicket } from "@fortawesome/free-solid-svg-icons/faTicket";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import "flowbite/dist/flowbite.js";
import "aos/dist/aos.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomRoutes from "./routes";
import UserProvider from "./context/UserContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./utils/DarkMode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-datepicker/dist/react-datepicker.css";

import es from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";
registerLocale("es", es);

library.add(
  faAngleLeft,
  faCircleCheck,
  faXmarkCircle,
  faHouse,
  faCalendarWeek,
  faTicket,
  faUsers,
  faPlus,
  faPenToSquare,
  faCartShopping,
  faPaperPlane,
  faLock,
  faFloppyDisk,
  faCreditCard,
  faEye,
  faEyeSlash,
  faGear,
  faUser,
  faRightFromBracket,
  faCircleInfo
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <UserProvider>
      <main className="bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/*" element={<CustomRoutes />} />
        </Routes>
      </main>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
