import Controller from "../components/Controller/Controller";
import Feed from "../components/Feed/Feed";

const ControllerDemoView = () => {
  const handleItemsByViewDurationChange = (itemsByViewDuration) => {
    console.log("Top viewed items:", itemsByViewDuration);
  };
  return (
    <Controller
      Feed={Feed}
      onItemsByViewDurationChange={handleItemsByViewDurationChange}
    />
  );
};

export default ControllerDemoView;
