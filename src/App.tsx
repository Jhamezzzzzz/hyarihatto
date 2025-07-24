import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignInLead from "./pages/AuthPages/SignInLead";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/QuestLeader/HomeLeader";
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
import Homepage from "./pages/MainPages/MainHome"
// import QuestUser from "./pages/QuestUser/QuestUserTest"
// import QuestUserTest from "./pages/QuestUser/QuestUserTest"
import ChoiceUser from "./pages/MainPages/MainUser"
import PanduanHyat from "./pages/Panduan/PanduanHyat"
import IdentityFormHyarihatto from "./pages/Forms/Hyarihatto/Identity";
import Step1FormHyarihatto from "./pages/Forms/Hyarihatto/Step1";
import Step2FormHyarihatto from "./pages/Forms/Hyarihatto/Step2";
import Step3FormHyarihatto from "./pages/Forms/Hyarihatto/Step3";
import Step4FormHyarihatto from "./pages/Forms/Hyarihatto/Step4";
import Step5FormHyarihatto from "./pages/Forms/Hyarihatto/Step5";
import Step6FormHyarihatto from "./pages/Forms/Hyarihatto/Step6";
import IdentityFormVoiceMember from "./pages/FormVoiceMember/QuestVoiceMember/Identity";
import Step1FormVoiceMember from "./pages/FormVoiceMember/QuestVoiceMember/Step1Voice";
import Step2FormVoiceMember from "./pages/FormVoiceMember/QuestVoiceMember/Step2Voice";
import Step3FormVoiceMember from "./pages/FormVoiceMember/QuestVoiceMember/Step3Voice";
import Finish from "./pages/Forms/Hyarihatto/Finish";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route  path="/home" element={<Home />} />
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
          <Route index path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignInLead />} />
          <Route path="/signup" element={<SignUp />} />
      
          {/* Member */}
          <Route path="/member" element={<ChoiceUser />} />
          {/* <Route path="/member/hyarihatto" element={<QuestUserTest />} /> */}
          <Route path="/member/voice-member" element={<IdentityFormVoiceMember />} />,
          <Route path="/member/voice-member/1" element={<Step1FormVoiceMember />} />
          <Route path="/member/voice-member/2" element={<Step2FormVoiceMember />} />
          <Route path="/member/voice-member/3" element={<Step3FormVoiceMember />} />

          {/* Member Form Hyarihatto */}
          <Route path="/member/hyarihatto" element={<IdentityFormHyarihatto />} />,
          <Route path="/member/hyarihatto/1" element={<Step1FormHyarihatto />} />,
          <Route path="/member/hyarihatto/2" element={<Step2FormHyarihatto />} />,
          <Route path="/member/hyarihatto/3" element={<Step3FormHyarihatto />} />,
          <Route path="/member/hyarihatto/4" element={<Step4FormHyarihatto />} />,
          <Route path="/member/hyarihatto/5" element={<Step5FormHyarihatto />} />,
          <Route path="/member/hyarihatto/6" element={<Step6FormHyarihatto />} />,
          <Route path="/member/hyarihatto/submitted" element={<Finish />} />,

          <Route path="/panduan" element={<PanduanHyat />} />
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
