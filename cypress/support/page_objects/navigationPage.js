function selectGroupMenuItem(groupName) {
  cy.get(`[title="${groupName}"]`).then((menu) => {
    cy.wrap(menu)
      .find(".expand-state svg g g")
      .invoke("attr", "data-name")
      .then((attr) => {
        console.log("here");
        console.log(attr);
        if (attr.includes("chevron-left")) {
          cy.wrap(menu).click();
        }
      });
  });
}

export class navigationPage {
  formLayoutsPage() {
    selectGroupMenuItem("Forms");

    cy.contains("Form Layouts").click();
  }

  datepickerPage() {
    selectGroupMenuItem("Forms");

    cy.contains("Datepicker").click();
  }

  toasterPage() {
    selectGroupMenuItem("Modal & Overlays");

    cy.contains("Toastr").click();
  }

  webTablesPage() {
    selectGroupMenuItem("Tables & Data");

    cy.contains("Smart Table").click();
  }

  toolTipsPage() {
    selectGroupMenuItem("Modal & Overlays");

    cy.contains("Tooltip").click();
  }
}

export const navigateTo = new navigationPage();
