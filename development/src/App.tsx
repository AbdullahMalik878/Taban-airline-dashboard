import React from "react";
import Navbar from "./components/shared/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Availability } from "./pages/Availability";
import { FlightManifest } from "./pages/FlightManifest";
import { Refund } from "./pages/Refund";
import { SalesReport } from "./pages/SalesReport";
import { FlightInventory } from "./pages/FlightInventory";
import { AgentSeatQuoata } from "./pages/AgentSeatQuota";
import { FlightMonitoring } from "./pages/FlightMonitoring";
import { FlightRevenue } from "./pages/FlightRevenue";
import { AgentPayment } from "./pages/AgentPayment";
import { AgentSellingLimit } from "./pages/AgentSellingLimit";
import { Taxes } from "./pages/Taxes";
import { CancellationCharges } from "./pages/CancellationCharges";
import { PreManifest } from "./pages/PreManifest";
import { FlightCheckin } from "./pages/FlightCheckin";
import { PostManifest } from "./pages/PostManifest";
import { Agents } from "./pages/Agents";
import { Users } from "./pages/Users";
import { Flights } from "./pages/Flights";
import { Airports } from "./pages/Airports";
import { PssName } from "./pages/PSSName";
import { Currency } from "./pages/Currency";
import { AgentRole } from "./pages/AgentRole";
import { Airlines } from "./pages/Airlines";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import Footer from "./components/shared/Footer/Footer";
import { useAppDispatch, useAppSelector } from "./hooks/storeHook";

function App() {
  const dispatch = useAppDispatch();
  const { sidebarActiveState, fullScreenRef } = useAppSelector(
    (state) => state.appcontrols
  );
  const APPRef = React.useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (APPRef.current) {
        APPRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  React.useEffect(() => {
    toggleFullscreen();
  }, [fullScreenRef]);
  return (
    <>
      {/* <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 bg-white p-2 rounded-full z-50"
      >
        Toggle Fullscreen
      </button> */}
      {/* layout */}
      <div
        ref={APPRef}
        className="h-screen flex flex-row justify-start items-start w-full overflow-hidden bg-primary text-primary-foreground"
      >
        {/* sidebar */}
        <aside
          className={`${
            sidebarActiveState
              ? `absolute z-10 w-64 bg-red-40 before:bg-slate-950 before:fixed before:top-0 before:bottom-0 before:left-0 before:right-0 before:w-full before:h-full before:opacity-50 sm:before:hidden sm:relative`
              : "w-20"
          } border-r border-gray-300 transition-all duration-150`}
        >
          <Sidebar />
        </aside>
        <section
          className={`${
            sidebarActiveState
              ? "w-full sm:w-[calc(100vw-256px)]"
              : "w-[calc(100vw-80px)]"
          } h-full flex flex-col justify-start bg-primary text-primary-foreground transition-all duration-150`}
        >
          <nav className="h-16 border-b border-gray-300 bg-primary text-primary-foreground">
            <Navbar />
          </nav>
          <main className="h-[calc(100vh-120px)] overflow-scroll scrollbarwork p-2">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/flight-manifest" element={<FlightManifest />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/salesreport" element={<SalesReport />} />
              <Route path="/flight-inventory" element={<FlightInventory />} />
              <Route path="/agent-seat-quota" element={<AgentSeatQuoata />} />
              <Route path="/flight-monitoring" element={<FlightMonitoring />} />
              <Route path="/flight-revenue" element={<FlightRevenue />} />
              <Route path="/agent-payment" element={<AgentPayment />} />
              <Route
                path="/agent-selling-limit"
                element={<AgentSellingLimit />}
              />
              <Route path="/taxes" element={<Taxes />} />
              <Route
                path="/cancellation-charges"
                element={<CancellationCharges />}
              />
              <Route path="/pre-manifest" element={<PreManifest />} />
              <Route path="/flight-checkin" element={<FlightCheckin />} />
              <Route path="/post-manifest" element={<PostManifest />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/users" element={<Users />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/airports" element={<Airports />} />
              <Route path="/site-settings" element={<PssName />} />
              <Route path="/currency" element={<Currency />} />
              <Route path="/agent-role" element={<AgentRole />} />
              <Route path="/airline" element={<Airlines />} />
            </Routes>
          </main>
          <footer className="h-14 relative bottom-0 mt-auto border-t border-gray-300">
            <Footer />
          </footer>
        </section>
      </div>
    </>
  );
}

export default App;
