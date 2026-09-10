import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './data/store';

import { Landing } from './pages/Landing';
import { RequestInvitation } from './pages/RequestInvitation';
import { Confirmation } from './pages/Confirmation';
import { Dashboard } from './pages/Dashboard';
import { DreamDatesInfo } from './pages/DreamDatesInfo';
import { ProfileBuilder } from './pages/ProfileBuilder';
import { ReviewPending } from './pages/ReviewPending';
import { Decision } from './pages/Decision';
import { Pricing } from './pages/Pricing';
import { Consultation } from './pages/Consultation';
import { Picks } from './pages/Picks';
import { Dates } from './pages/Dates';
import { Feedback } from './pages/Feedback';
import { Matches } from './pages/Matches';
import { MatchInbox } from './pages/MatchInbox';
import { Invite } from './pages/Invite';

import { AdminGate } from './pages/admin/AdminGate';
import { AdminToday } from './pages/admin/AdminToday';
import { AdminReview } from './pages/admin/AdminReview';
import { AdminProfiles } from './pages/admin/AdminProfiles';
import { AdminRegions } from './pages/admin/AdminRegions';
import { AdminMigration } from './pages/admin/AdminMigration';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/request-invitation" element={<RequestInvitation />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dream-dates" element={<DreamDatesInfo />} />
          <Route path="/profile" element={<ProfileBuilder />} />
          <Route path="/review" element={<ReviewPending />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/picks" element={<Picks />} />
          <Route path="/dates" element={<Dates />} />
          <Route path="/dates/:dateId/feedback" element={<Feedback />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/inbox/:dateId" element={<MatchInbox />} />
          <Route path="/invite" element={<Invite />} />

          <Route path="/admin" element={<AdminGate />} />
          <Route path="/admin/today" element={<AdminToday />} />
          <Route path="/admin/review" element={<AdminReview />} />
          <Route path="/admin/profiles" element={<AdminProfiles />} />
          <Route path="/admin/regions" element={<AdminRegions />} />
          <Route path="/admin/migration" element={<AdminMigration />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
