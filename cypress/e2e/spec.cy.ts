describe("My First Test", () => {
  it("Visits the Cryptorius", () => {
    cy.intercept("/").as("getCrypts");

    cy.visit("http://localhost:3000/");
    cy.contains("Cryptorius");

    cy.wait("@getCrypts").then(() => {
      cy.contains("Next").click();
      cy.contains("15");
      cy.contains("Prev").click();
      cy.contains("ETH");
      cy.contains("Prev").click();
      cy.contains("BTC").click();

      cy.url().should("include", "/bitcoin");
      cy.contains("Symbol: BTC");
      cy.contains("Binance");

      cy.contains("Add to Wallet").click();
      cy.contains("Add Bitcoin to Wallet");

      cy.get(".modal__input_crypt").type("3").should("have.value", "3");

      cy.get(".button-container > .button__wrapper").click();

      cy.get(".wallet-about__text").click();
      cy.get("ul.table_type_wallet > .table-line > :nth-child(1)").contains(
        "Bitcoin"
      );
      cy.get("ul.table_type_wallet > .table-line > :nth-child(2)").contains(
        "3"
      );

      cy.get(".remove").click();
      cy.get(".form-delete__input").type("2").should("have.value", "2");

      cy.get(".form-delete > .button__wrapper").click();
      cy.get("ul.table_type_wallet > .table-line > :nth-child(2)").contains(
        "1"
      );
      cy.get(
        "header > .modal-wrapper > .modal-content > .modal-header > .modal__cross"
      ).click();

      cy.get(".logo__name").click();
      cy.contains("All Cryptocurrency");

      cy.get(":nth-child(2) > .button__wrapper").click();

      cy.get(".modal__input").type("2.5").should("have.value", "2.5");
      cy.get(".button-container > .button__wrapper").click();

      cy.get(".wallet-about__text").click();
      cy.get("ul.table_type_wallet > .table-line > :nth-child(2)").contains(
        "3.5"
      );
      cy.get(
        "header > .modal-wrapper > .modal-content > .modal-header > .modal__cross"
      ).click();

      cy.get(".crypts > :nth-child(3) > .button__wrapper").click();
      cy.get(".modal__input").type("1.03").should("have.value", "1.03");
      cy.get(".button-container > .button__wrapper").click();

      cy.get(".wallet-about__text").click();
      cy.get("ul.table_type_wallet > :nth-child(1) > :nth-child(2)").contains(
        "3.5"
      );
      cy.get("ul.table_type_wallet > :nth-child(2) > :nth-child(2)").contains(
        "1.03"
      );

      cy.get(
        "header > .modal-wrapper > .modal-content > .modal-header > .modal__cross"
      ).click();

      cy.get(":nth-child(3) > .crypto__name").click();

      cy.url().should("include", "/tether");

      cy.get(".content__title_big").contains("Tether");
    });
  });
});
