const ALLOWED_INCONSISTENCY_MS = 100;

describe("View duration tracking app", () => {
	// One integration test like this covers a lot of code lines
	it('correctly displays and records view duration of photos"', () => {
		cy.visit("http://localhost:3000");
		cy.contains("Scroll down to start the experiment");
		cy.get("[data-cy=ViewDurationTracker]").then((list) => {
			const trackers = list.get();
			// Make sure the app is fully loaded by waiting
			cy.wait(500);
			// Scroll to an image, wait some time to simulate user "viewing it"
			cy.get(trackers[10]).scrollIntoView();
			cy.wait(500);
			cy.get(trackers[11]).scrollIntoView();
			cy.wait(500);
			cy.get(trackers[10]).scrollIntoView();
			cy.wait(1000);
			cy.get(trackers[20]).scrollIntoView();
			cy.wait(500);
			cy.get(trackers[21]).scrollIntoView();
			cy.wait(1700);
			// Last image will not get into the dashboard because we dont
			// "scroll it out of view"
			cy.get(trackers[22]).scrollIntoView();
		});

		// Check if 4 images are indeed shown, ordered as they should
		cy.get("[data-cy=dashboard-item]").as("items").should("have.length", 4);
		cy.get("@items").first().contains("Top 1");
		cy.get("@items").last().contains("Top 4");

    // Dashboard items will contain view duration as 1.75s
    // Allow up to 100ms of leeway, and only serch for 1.7 in that case
    cy.get("@items").eq(0).contains("1.7");
    cy.get("@items").eq(1).contains("1.5");
    cy.get("@items").eq(2).contains("0.5");
    cy.get("@items").eq(3).contains("0.5");

	});
});
