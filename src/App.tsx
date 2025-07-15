import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignInLead from "./pages/AuthPages/SignInLead";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import DetailPage from './pages/Dashboard/DetailPage';
import HyarihattoSummary from "./pages/Hyarihatto/Summary";
import HyarihattoReview from "./pages/Hyarihatto/Review";
import HyarihattoHistory from "./pages/Hyarihatto/History";
import VoiceMemberSummary from "./pages/VoiceMember/Summary";
import VoiceMemberReview from "./pages/VoiceMember/Review";
import VoiceMemberHistory from "./pages/VoiceMember/History";
import AccidentLevel from "./pages/Master/AccidentLevel";
import HazardLevel from "./pages/Master/HazardLevel";
import WorkFrequency from "./pages/Master/WorkFrequency";
import ScoreRank from "./pages/Master/ScoreRank";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/:id" element={<DetailPage />} />

            {/* Hyarihatto */}
            <Route path="/hyarihatto/summary" element={<HyarihattoSummary />} />
            <Route path="/hyarihatto/review" element={<HyarihattoReview />} />
            <Route path="/hyarihatto/history" element={<HyarihattoHistory />} />
            
            {/* Voice Member */}
            <Route path="/voice-member/summary" element={<VoiceMemberSummary />} />
            <Route path="/voice-member/review" element={<VoiceMemberReview />} />
            <Route path="/voice-member/history" element={<VoiceMemberHistory />} />
            
            {/* Master */}
            <Route path="/master/level-tipe-kecelakaan" element={<AccidentLevel />} />
            <Route path="/master/level-pencegah-bahaya" element={<HazardLevel />} />
            <Route path="/master/frekuensi-kerja" element={<WorkFrequency />} />
            <Route path="/master/score-rank" element={<ScoreRank />} />
            
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignInLead />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
