export class FormsLayoutPage {
  submitInlineForm(name, email) {
    cy.get(".inline-form-card nb-card-body form").then((form) => {
      cy.wrap(form).find('[placeholder="Jane Doe"]').type(name);
      cy.wrap(form).find('[placeholder="Email"]').type(email);
      cy.wrap(form).find("nb-checkbox label input").check({ force: true });
      cy.wrap(form).submit();
    });
  }
}

export const formsLayoutPage = new FormsLayoutPage();
