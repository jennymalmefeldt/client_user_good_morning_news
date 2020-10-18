describe("Premium article view for visitor/registered/subscriber", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:articles_index.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/1",
      response: "fixture:article_show_premium.json",
    });
  });

  context("visitor", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("[data-cy='article-1']").within(() => {
        cy.get("[data-cy='title']").click();
      });
    });

    it("can only see first 300 characters", () => {
      cy.get("[data-cy='article']").within(() => {
        cy.get("[data-cy='title']").should("contain", "Hello World");
        cy.get("[data-cy='teaser']").should(
          "contain",
          "Sun is always shining in Kista"
        );
        cy.get("[data-cy='content']").should(
          "have.text",
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
        );
      });
      cy.get("[data-cy='premium-alert']").should(
        "contain",
        "This is part of our premium content, to get full access become premium user"
      );
      cy.get("[data-cy='premium-button']").should("contain", "Become premium!");
    });
  });

  context("registered", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("registered");
      cy.get("[data-cy='article-1']").within(() => {
        cy.get("[data-cy='title']").click();
      });
    });

    it("can only see first 300 characters", () => {
      cy.get("[data-cy='article']").within(() => {
        cy.get("[data-cy='title']").should("contain", "Hello World");
        cy.get("[data-cy='teaser']").should(
          "contain",
          "Sun is always shining in Kista"
        );
        cy.get("[data-cy='content']").should(
          "have.text",
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
        );
      });
      cy.get("[data-cy='premium-alert']").should(
        "contain",
        "This is part of our premium content, to get full access become premium user"
      );
      cy.get("[data-cy='premium-button']").should("contain", "Become premium!");
    });
  });

  context("subscriber", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("subscriber");
      cy.get("[data-cy='article-1']").within(() => {
        cy.get("[data-cy='title']").click();
      });
    });

    it("can only see first 300 characters", () => {
      cy.get("[data-cy='article']").within(() => {
        cy.get("[data-cy='title']").should("contain", "Hello World");
        cy.get("[data-cy='teaser']").should(
          "contain",
          "Sun is always shining in Kista"
        );
        cy.get("[data-cy='content']").should(
          "have.text",
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
        );
      });
      cy.get("[data-cy='premium-alert']").should("not.exist");
      cy.get("[data-cy='premium-button']").should("not.exist");
    });
  });
});
