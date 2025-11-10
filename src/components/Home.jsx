import React from "react";
import HeroPart from "./HeroPart";
import ActiveChallenge from "./ActiveChallenge";

const activeChallengePrm = fetch(
  "http://localhost:3000/active-challenges"
).then((res) => res.json());

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-700 via-gray-600 to-gray-800">
      <HeroPart></HeroPart>
      <ActiveChallenge
        activeChallengePrm={activeChallengePrm}
      ></ActiveChallenge>
    </div>
  );
};

export default Home;
