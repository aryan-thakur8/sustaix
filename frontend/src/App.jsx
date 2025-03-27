// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import SignupPage from "./pages/SignupPage"
// import DashboardPage from "./pages/DashboardPage"
// import RewardStore from "./pages/RewardStore"
// import ScanPage from "./pages/ScanPage"
// import "./App.css"

// function App() {
//   return (
//     <div className="app-container">
//       <Router>
//         <Routes>
//           <Route path="/" element={<SignupPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/reward-store" element={<RewardStore />} />
//           <Route path="/scan" element={<ScanPage />} /> {/* Now correctly using ScanPage */}
//           <Route path="/leaderboard" element={<DashboardPage />} /> {/* Still a placeholder */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App



// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import SignupPage from "./pages/SignupPage"
// import DashboardPage from "./pages/DashboardPage"
// import RewardStore from "./pages/RewardStore"
// import ScanPage from "./pages/ScanPage"
// import RegisterPage from "./pages/RegisterPage"
// import "./App.css"

// function App() {
//   return (
//     <div className="app-container">
//       <Router>
//         <Routes>
//           <Route path="/" element={<SignupPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/reward-store" element={<RewardStore />} />
//           <Route path="/scan" element={<ScanPage />} />
//           <Route path="/leaderboard" element={<DashboardPage />} /> {/* Placeholder for leaderboard */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import RewardStore from "./pages/RewardStore";
import ScanPage from "./pages/ScanPage";
import RegisterPage from "./pages/RegisterPage";
import GateControlPage from "./pages/GateControlPage";
import WasteDetectionPage from "./pages/WasteDetectionPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reward-store" element={<RewardStore />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/gate-control/:binId" element={<GateControlPage />} />
          <Route path="/waste-detection/:binId" element={<WasteDetectionPage />} />
          <Route path="/leaderboard" element={<DashboardPage />} /> {/* Placeholder for leaderboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
