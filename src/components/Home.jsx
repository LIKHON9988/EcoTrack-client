import React from "react";
import HeroPart from "./HeroPart";
import ActiveChallenge from "./ActiveChallenge";
import LiveStatistics from "./LiveStatistics";
import RecentTips from "./RecentTips";
import UpcomingEvents from "./UpcomingEvents";
import WhyGoGreen from "./WhyGoGreen";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009]">
      <HeroPart></HeroPart>
      {/* Live statistics above Active Challenges, dynamic from DB */}
      <LiveStatistics></LiveStatistics>
      <ActiveChallenge></ActiveChallenge>
      {/* New sections (non-intrusive additions, no changes to existing behavior) */}
      <RecentTips></RecentTips>
      <UpcomingEvents></UpcomingEvents>
      <WhyGoGreen></WhyGoGreen>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
