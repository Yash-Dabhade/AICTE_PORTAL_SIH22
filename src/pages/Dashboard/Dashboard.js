import React from "react";
import LeaderBoard from "./LeaderBoard";
import TrendingGraph from "./TrendingGraph";
import UniversitiesTable from "./UniversitiesTable";

function Dashboard() {
  return <div className="parent-section darkMode"><b className="m-2">Leader Board</b>
  <LeaderBoard/>
  <div className="grid grid-cols-2 gap-4"> 
  <UniversitiesTable/>
  <TrendingGraph/>
  </div>
 
  </div>
}

export default Dashboard;
