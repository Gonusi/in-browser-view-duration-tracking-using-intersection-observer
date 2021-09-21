import { useCallback } from "react";
import Feed from "../components/Feed/Feed";
import ViewDurationTracker from "../components/ViewDurationTracker/ViewDurationTracker";
import imageData from "../unsplashPhotoData.json";

const FeedDemoView = () => {
  const handleViewDurationMsChange = useCallback(
    ({ viewDuration, properties }) => {
      const viewDurationSeconds = viewDuration / 1000;
      console.log(
        `Feed item viewDurationChange: ${viewDurationSeconds}s, ID: ${properties.id} by ${properties.username}`
      );
    },
    []
  );

  return (
    <>
      <h1>Thank you, Unsplash and the artists!</h1>
      <p>Open console to see view duration of each element as you scroll</p>
      <p>
        Next we'll build a component which aggregates this data and displays it,
        real time, in a simple dashboard
      </p>
      <Feed
        imageData={imageData}
        onViewDurationMsChange={handleViewDurationMsChange}
        DurationTracker={ViewDurationTracker}
      />
    </>
  );
};

export default FeedDemoView;
