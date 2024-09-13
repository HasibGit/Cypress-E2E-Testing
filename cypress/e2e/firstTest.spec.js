/// <reference types="cypress" />

describe("First Test", () => {
  it("should run first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by tag name
    cy.get("input");

    // by id
    cy.get("#inputEmail");

    // by class value
    cy.get(".input-full-width");

    // by attribute name
    cy.get("[fullwidth]");

    // by attribute and value
    cy.get('[placeholder="Email"]');

    // by entire class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by multiple attributes
    cy.get('[placeholder="Email"][fullwidth]');

    // by tag attribute id and class
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

    // by cypress test id
    cy.get('[data-cy="imputEmail1"]');
  });

  it("run second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // get() -> Find by elements
    // find() -> find by child elements
    // contains() -> find by text content

    // only finds the first element
    cy.contains("Sign in");

    // target specific element with contains
    cy.contains('[status="warning"]', "Sign in");

    // target a child element. Can't directly do cy.find
    cy.contains("nb-card", "Horizontal form").find("button");
    // can chain contains
    cy.contains("nb-card", "Horizontal form").contains("Sign in");

    cy.get('[id="inputEmail3"]')
      .parents("form")
      .find("button")
      .contains("Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

  it("save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .get('[for="inputEmail1"]')
      .should("contain", "Email");

    cy.contains("nb-card", "Using the Grid")
      .get('[for="inputPassword2"]')
      .should("contain", "Password");

    // we cannot use normal js variables
    // need to use cypress alias

    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");

    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // another approach

    cy.contains("nb-card", "Using the Grid").then((usingTheGrid) => {
      cy.wrap(usingTheGrid)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGrid)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });

  it("extract text values", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const text = label.text();

      cy.wrap(label).contains(text);
    });

    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => expect(text).to.eql("Email address"));

    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => expect(classValue).to.equal("label"));
  });

  it("test for radio and checkbox", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkbox", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // check, uncheck, click all options available
    cy.get('[type="checkbox"]').eq(0).check({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
    cy.get('[type="checkbox"]').eq(2).check({ force: true });
  });

  it("datepicker", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker").then((card) => {
      cy.wrap(card).find("input").click();

      let date = new Date();
      date.setDate(date.getDate() + 80);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      function selectDayFromCurrent() {
        cy.get("nb-calendar-navigation")
          .invoke("attr", "ng-reflect-date")
          .then((dateAttribute) => {
            if (
              !dateAttribute.includes(futureMonth) ||
              !dateAttribute.includes(futureYear)
            ) {
              cy.get('[data-name="chevron-right"]').click();
              selectDayFromCurrent();
            } else {
              return;
            }
          });
      }

      selectDayFromCurrent();

      cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();

      cy.wrap(card)
        .find("input")
        .invoke("prop", "value")
        .should("contain", dateToAssert);

      cy.wrap(card).find("input").should("have.value", dateToAssert);
    });
  });

  it("should test lists and dropdowns", () => {
    cy.visit("/");

    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");

    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, idx) => {
        const itemText = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);

        if (idx < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("test web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // get row by text
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("35");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "35");
      });

    // get row by index
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("John");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Smith");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableCols) => {
        cy.wrap(tableCols).eq(2).should("contain", "John");
        cy.wrap(tableCols).eq(3).should("contain", "Smith");
      });

    // test filter operation
    const age = [20, 30, 40, 200];

    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it.only("tooltips", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });
});
