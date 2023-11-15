import React from "react";

import TestComponent from "./TestComponent";

const NUMBER_OF_SHOW_ITEMS = 11;

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

  it("Should finish loading and always have the same number of shown items in the screen after multiple loadings", () => {
    cy.mount(<TestComponent />);

    cy.wait(2000);
    cy.get('[data-cy="infiniteScrollContainer"]').should("be.visible");
    cy.get('[data-cy="person"]').should("have.length", NUMBER_OF_SHOW_ITEMS);
    cy.get('[data-cy="infiniteScrollContainer"]').scrollTo(0, 1000);
    cy.get('[data-cy="infiniteScrollLoading"]').should("be.visible");
    cy.get('[data-cy="infiniteScrollLoading"]').should("not.exist", {
      timeout: 10000,
    });
    cy.get('[data-cy="person"]').should("have.length", NUMBER_OF_SHOW_ITEMS);
    cy.get('[data-cy="infiniteScrollContainer"]').scrollTo(0, 1000);
    cy.get('[data-cy="person"]').should("have.length", NUMBER_OF_SHOW_ITEMS);
  });
});
