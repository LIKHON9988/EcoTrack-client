import React from "react";
import HeroPart from "./HeroPart";
import ActiveChallenge from "./ActiveChallenge";

const activeChallengePrm = fetch(
  "http://localhost:3000/active-challenges"
).then((res) => res.json());

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009]">
      <HeroPart></HeroPart>
      <ActiveChallenge
        activeChallengePrm={activeChallengePrm}
      ></ActiveChallenge>
    </div>
  );
};

export default Home;
