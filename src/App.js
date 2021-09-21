import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from "react-router-dom";
import ViewDurationTrackerDemoView from "./componentDemoViews/ViewDurationTrackerDemoView";
import FeedDemoView from "./componentDemoViews/FeedDemoView";
import ControllerDemoView from "./componentDemoViews/ControllerDemoView";
import DashboardDemoView from "./componentDemoViews/DashboardDemoView";
import styles from "./styles.module.scss";

export default function App() {
	return (
		<Router>
			{" "}
			<div className={styles.container}>
				<p>
					This is a demo view for my blog post. Visit the links to see demo of separate
					components:
				</p>
				<ol className={styles.list}>
					<li>
						<NavLink
							activeClassName={styles.active}
							to="/component/ViewDurationTracker"
						>
							ViewDurationTracker{" "}
						</NavLink>
						- tracks view duration, and calls a callback with it when component leaves
						the viewport.
					</li>
					<li>
						<NavLink activeClassName={styles.active} to="/component/Feed">
							Feed
						</NavLink>{" "}
						- uses ViewDurationTracker's to display a photo list loaded from Unsplash.
					</li>
					<li>
						<NavLink activeClassName={styles.active} to="/component/Controller">
							Controller
						</NavLink>{" "}
						- aggregates view duration data and can pass it to any amount of elements
						passed to it as props. We'll build a dashboard and pass it to the
						controller, so the dashboard can receive data and render it nicely.
					</li>
					<li>
						<NavLink
							activeClassName={styles.active}
							to="/component/Dashboard"
						>
							Dashboard
						</NavLink>{" "}
						- displays data passed by Controller. Also, this is the "default" view for
						this experiment, since now we have the complete "app".
					</li>
				</ol>
			</div>
			<Switch>
				<Route path="/component/ViewDurationTracker">
					<ViewDurationTrackerDemoView />
				</Route>
				<Route path="/component/Feed">
					<FeedDemoView />
				</Route>
				<Route path="/component/Controller">
					<ControllerDemoView />
				</Route>
				<Route path="/component/Dashboard">
					<DashboardDemoView />
				</Route>
        <Route path="/">
				<Redirect to="/component/Dashboard"/>
				</Route>
			</Switch>
		</Router>
	);
}

// Visit my blog a (hopefully interesting) writeups about such stuff.
// Feel free to contact me, I have recently discovered social interaction.
// https://kasparasanusauskas.com
