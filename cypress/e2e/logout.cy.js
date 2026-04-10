describe('Logout Test', () => {
  it('should login, logout and redirect to login', () => {
    cy.visit('http://localhost:8080/auth')

    // Login
    cy.get('#login-email').type('admin@example.com')
    cy.get('#login-password').type('password123')
    cy.get('button').contains('Login').click()

    // Wait for redirect to home
    cy.url({ timeout: 10000 }).should('include', '/home')

    // Logout button should now exist
    cy.get('[data-testid="logout-btn"]').should('be.visible').click()

    // Verify redirect to login page
    cy.url().should('include', '/')
  })
})