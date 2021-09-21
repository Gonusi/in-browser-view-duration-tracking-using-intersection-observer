import { useEffect, useState, useCallback } from "react";
import ViewDurationTracker from "../ViewDurationTracker/ViewDurationTracker";
import * as FeedUtilities from "./FeedUtilities";
import styles from "./Feed.module.scss";

const Feed = ({ onViewDurationMsChange, DurationTracker, imageData }) => {
	const { dataByIds } = imageData;
	const imageCategoryCount = imageData.categories.length;

	const [orderedImageList, setOrderedImageList] = useState(
		FeedUtilities.getOrderedList(imageData)
	);

	useEffect(() => {
		setOrderedImageList(
			FeedUtilities.getShuffledBlockList(
				FeedUtilities.getOrderedList(imageData),
				imageCategoryCount
			)
		);
	}, [imageData, imageCategoryCount]);

	const handleViewDurationChangeMS = useCallback(
		({ viewDuration, properties }) => {
			// console.log("viewDuration", viewDuration);
			onViewDurationMsChange({ viewDuration, properties });
		},
		[onViewDurationMsChange]
	);

	return (
		<div className={styles.container}>
			<div className={styles.startupNotice}>
				<p>Scroll down to start the experiment</p>
				<p>
					This separator is required to avoid view duration counting begin while images
					are still loading. They are loaded lazy, so I can not just add an onload
					handler.
				</p>
				<p>
					Dealing with this is out of scope of this experiment, way too much code already.
				</p>
				<p>
					Even so, the browser sometimes fails to load lazy images on time, resulting in
					their height being 0, and so that 10 images can fit into the view. Solving this
					would require additional stuff not needed for the experiment too.
				</p>
				<p>↓↓↓</p>
			</div>
			{orderedImageList.map((id) => (
				<ViewDurationTracker
					key={dataByIds[id].id}
					id={dataByIds[id].id}
					data-cy="ViewDurationTracker"
					onViewDurationMsChange={handleViewDurationChangeMS}
					properties={{ ...dataByIds[id] }}
				>
					<figure className={styles.figure}>
						<img
							alt={dataByIds[id].description}
							className={styles.image}
							id={dataByIds[id].id}
							loading="lazy"
							src={dataByIds[id].src}
						/>
						<figcaption className={styles.caption}>
							{dataByIds[id].id} |{" "}
							<a href={dataByIds[id].userLink}>{dataByIds[id].username}</a>@
							<a href="https://unsplash.com">Unsplash</a>
						</figcaption>
					</figure>
				</ViewDurationTracker>
			))}
		</div>
	);
};

export default Feed;
