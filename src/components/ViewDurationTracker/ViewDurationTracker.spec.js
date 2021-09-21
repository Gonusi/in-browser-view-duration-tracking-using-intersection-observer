// JS | Cypress tests {% raw %}
// https://docs.cypress.io/guides/component-testing/introduction#Getting-Started
//
// npx cypress open-ct

import React from "react";
import { mount } from "@cypress/react";
import ViewDurationTracker from "./ViewDurationTracker";

beforeEach(() => {
	cy.viewport(320, 640);
});

it("renders children inside a div", () => {
	mount(<ViewDurationTracker>I am a single child</ViewDurationTracker>);
	cy.get("[data-cy=TimedViewContainer]").contains("I am a single child");
});

it("calls callback passing correct arguments", function () {
	window.callback = ({ viewDuration, properties }) => {
		expect(viewDuration).to.be.greaterThan(100);
		expect(viewDuration).to.be.lessThan(150);
		expect(properties.id).to.be.equal(1);
	};
	cy.spy(window, "callback").as("callback");
	mount(
		<div style={{ paddingTop: "10000px" }}>
			<ViewDurationTracker onViewDurationMsChange={callback} properties={{ id: 1 }}>
				I am a single child
			</ViewDurationTracker>
		</div>
	);

	cy.scrollTo("bottom");
	cy.wait(100);
	cy.scrollTo("top");
	cy.get("@callback").should("have.been.called");

	// NOTE: Creating a callback like this with assertions inside and spying on it
	// MIGHT NOT BE the way Cypress intends us to do things. Beware, but it
	// works, and I don't like the other way which might look like this for a
	// single argument, but get's even more tedious with more that one:
	// ---
	// cy.get("@callback").should(
	// 	"have.been.calledWithMatch",
	// 	Cypress.sinon.match.number
	// 		.and(Cypress.sinon.match((x) => x > 100, "> 100"))
	// 		.and(Cypress.sinon.match((x) => x < 150, "< 150"))
	// );
});
// end JS | Cypress tests {% endraw %}
