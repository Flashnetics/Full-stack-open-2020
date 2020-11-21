// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// eslint-disable-next-line no-undef
Cypress.Commands.add('login', ({ username, password }) => {
    // eslint-disable-next-line no-undef
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      // eslint-disable-next-line no-undef
      cy.visit('http://localhost:3000')
    })
  })
  // eslint-disable-next-line no-undef
  Cypress.Commands.add('createBlog', ({ content, important }) => {
    // eslint-disable-next-line no-undef
    cy.request({
      url: 'http://localhost:3001/api/notes',
      method: 'POST',
      body: { content, important },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })
  
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000')
  })