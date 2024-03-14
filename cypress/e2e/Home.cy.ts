describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Successfully renders "Attestation Station" header', () => {
    cy.get('h2:contains("Attestation Station")');
  });
});
