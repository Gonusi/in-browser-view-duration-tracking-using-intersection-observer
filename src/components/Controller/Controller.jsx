import { useState, useCallback, useEffect } from "react";
import ViewDurationTracker from "../ViewDurationTracker/ViewDurationTracker";
import imageData from "../../unsplashPhotoData.json";

const Controller = ({
	Dashboard,
	Feed,
	onItemsByViewDurationChange,
	topItemCount = 20,
	minViewDurationMs = 300,
}) => {
	const [items, setItems] = useState({});
	const [itemsByViewDuration, setItemsByViewDuration] = useState([]);
	const [lastViewedItem, setLastViewedItem] = useState();
	const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);

	const handleViewDurationMsChange = useCallback(({ properties, viewDuration }) => {
		setLastViewedItem({ properties, viewDuration });
		setItems((c) => ({
			...c,
			[properties.id]: {
				properties,
				viewDuration: viewDuration + c[properties.id]?.viewDuration || 0,
			},
		}));
	}, []);

	useEffect(() => {
		setItemsByViewDuration((c) => {
			if (!isTrackingEnabled) return c;
			// We'll have to select top 10 items from a potentially huge list
			// Simplest way - keep large array of all images and view times, sort on each update,
			// then copy to another array and splice to length of 10.
			// ---
			// However, potentially the arrays can get huge (with hours of scrolling, who knows?)
			// So let's instead add a "lastViewedItem", and check if its view duration
			// is more than that of bottom top10 item. If so, push it into top10,
			// and now we only have to sort 11 items, then splice to 10.
			if (!lastViewedItem || lastViewedItem.viewDuration < minViewDurationMs) return c;
			// TODO refactor code below, lots of duplicate code there
			// oops no time left at all, we're at -1 hour now
			if (!c?.length < topItemCount) {
				// top10 has not enough items yet, last viewed item is guaranteed to
				// be in the top 10 list
				const u = [...c];
				const indexOfItemWithSameIdAsLastViewedItem = c.findIndex(
					(item) => item.properties.id === lastViewedItem.properties.id
				);
				if (indexOfItemWithSameIdAsLastViewedItem >= 0) {
					c[indexOfItemWithSameIdAsLastViewedItem] = lastViewedItem;
				} else {
					u.push(lastViewedItem);
				}
				u.sort((a, b) => b.viewDuration - a.viewDuration);
				u.splice(topItemCount);
				return u;
			}

			if (c?.[c.length - 1].viewDuration < lastViewedItem.viewDuration) {
				// We have a full list of top10 items, now only add items if
				// last viewed item has view duration larger than bottom of top10 item
				const u = [...c];
				const indexOfItemWithSameIdAsLastViewedItem = c.findIndex(
					(item) => item.properties.id === lastViewedItem.properties.id
				);
				if (indexOfItemWithSameIdAsLastViewedItem >= 0) {
					c[indexOfItemWithSameIdAsLastViewedItem] = lastViewedItem;
				} else {
					u.push(lastViewedItem);
				}
				u.sort((a, b) => b.viewDuration - a.viewDuration);
				u.splice(topItemCount);
				return u;
			}

			return c;
		});
	}, [items, lastViewedItem, topItemCount, isTrackingEnabled]);

	useEffect(() => {
		onItemsByViewDurationChange?.(itemsByViewDuration);
	}, [itemsByViewDuration, onItemsByViewDurationChange]);

	return (
		<>
			{Dashboard && (
				<Dashboard
					imageData={imageData}
					isTrackingEnabled={isTrackingEnabled}
					itemsByViewDuration={itemsByViewDuration}
					minViewDurationMs={minViewDurationMs}
					setIsTrackingEnabled={setIsTrackingEnabled}
				/>
			)}
			{Feed && (
				<Feed
					DurationTracker={ViewDurationTracker}
					imageData={imageData}
					onViewDurationMsChange={handleViewDurationMsChange}
				/>
			)}
		</>
	);
};

export default Controller;
