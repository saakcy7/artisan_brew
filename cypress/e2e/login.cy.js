describe('Login Test', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:8080/auth')

    cy.get('#login-email').type('admin@example.com')
    cy.get('#login-password').type('password123')
    cy.get('button').contains('Login').click()

    cy.url({ timeout: 1000000 }).should('include', '/home')
  })
})