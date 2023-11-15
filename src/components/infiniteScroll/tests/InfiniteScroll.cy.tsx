import React from "react";

import TestComponent from "./TestComponent";

describe("<InfiniteScroll />", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it("Should be able to render", () => {
    cy.mount(<TestComponent />);

    cy.wait(2000);
    cy.get('[data-cy="infiniteScrollContainer"]').should("be.visible");
  });

  it("Should be able to scroll and start loading the data", () => {
    cy.mount(<TestComponent />);

    cy.wait(2000);
    cy.get('[data-cy="infiniteScrollLoading"]').should("not.exist");
    cy.get('[data-cy="infiniteScrollContainer"]').scrollTo(0, 1000);
    cy.get('[data-cy="infiniteScrollLoading"]').should("be.visible");
  });

  it("Should finish loading and have more visible items in the screens", () => {
    cy.mount(<TestComponent />);

    cy.wait(2000);
    cy.get('[data-cy="infiniteScrollContainer"]').should("be.visible");
    cy.get('[data-cy="person"]').should("have.length", 11);
    cy.get('[data-cy="infiniteScrollContainer"]').scrollTo(0, 1000);
    cy.get('[data-cy="infiniteScrollLoading"]').should("be.visible");
    cy.get('[data-cy="infiniteScrollLoading"]').should("not.exist", {
      timeout: 10000,
    });
    cy.get('[data-cy="person"]').should("have.length", 11);
    cy.get('[data-cy="infiniteScrollContainer"]').scrollTo(0, 1000);
    cy.get('[data-cy="person"]').should("have.length", 11);
  });
});
