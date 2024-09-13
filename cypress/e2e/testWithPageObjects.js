import { formsLayoutPage } from "../support/page_objects/formsLayoutPage";
import { navigateTo } from "../support/page_objects/navigationPage";

describe("Test with page objects", () => {
  beforeEach("Open application", () => {
    cy.visit("/");
  });

  it("verify navigations across the page", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.toasterPage();
    navigateTo.toolTipsPage();
    navigateTo.webTablesPage();
  });

  it("should navigate to form layouts page and submit inline form", () => {
    navigateTo.formLayoutsPage();
    formsLayoutPage.submitInlineForm("Hasib", "hasibullah04@gmail.com");
  });
});
