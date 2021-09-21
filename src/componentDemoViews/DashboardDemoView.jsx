import Controller from "../components/Controller/Controller";
import Dashboard from "../components/Dashboard/Dashboard";
import Feed from "../components/Feed/Feed";

// This view ties it all together.
// We have the Controller tracking the Feed, which passes view duration from each component.
// The Dashboard displays the top 10 images and their view durations, real time.
// Cool stuff.

const DashboardDemoView = () => {
  return <Controller Feed={Feed} Dashboard={Dashboard} />;
};

export default DashboardDemoView;
