import styles from "./Dashboard.module.scss";

const Dashboard = ({ itemsByViewDuration, minViewDurationMs }) => {
	const handleClick = (id) => {
		document.getElementById(id).scrollIntoView();
	};

	return (
		<>
			<div className={styles.container}>
				{itemsByViewDuration?.map(({ properties, viewDuration }, index) => (
					<figure
						data-cy="dashboard-item"
						data-cy-dashboard-id={properties.id}
						className={styles.figure}
						key={properties.id}
						onClick={() => handleClick(properties.id)}
					>
						Top {index + 1}
						<img
							className={styles.image}
							src={properties.src}
							alt={properties.description}
						/>
						<figcaption>{(viewDuration / 1000).toFixed(2)}s</figcaption>
					</figure>
				))}
			</div>
			<div className={styles.minTrackedViewDuration}>
				Min. tracked duration: {minViewDurationMs / 1000}s
			</div>
		</>
	);
};

export default Dashboard;
