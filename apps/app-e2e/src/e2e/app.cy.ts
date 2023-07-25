import { it } from "mocha";

/* eslint-disable cypress/unsafe-to-chain-command */
// describe('login tests', () => {
//   beforeEach(() => cy.visit('http://localhost:4200/login'));

//   it('should display the header', () => {
//     cy.get('h1').contains('Hey, Welcome Back');
//   });

//   it('should display a correct input form', () => {
//     cy.get('input[name="username"]').should('exist').should('be.visible');
//     cy.get('input[name="password"]').should('exist').should('be.visible');
//     cy.get('button[type="submit"]').should('exist').should('be.visible').contains('Login');
//   });

//   it('should display link to continue as guest', () => {
//     cy.get('a').contains('Continue as guest').click();
//   });

//   it('should navigate to signup', () => {
//     cy.get('a').contains('Create').click();
//     cy.url().should('include', 'signup');
//   });

//   it('should prevent incorrect login attempt', () => {
//     cy.fixture('user-details.json').then((userData) => {
//       cy.get('input[name="username"]').type(userData[0].username);
//       cy.get('input[name="password"]').type(userData[0].password);
//       cy.get('button').click();
//       cy.url().should('include', 'login');
//     });
//   });
// });

// describe('signup tests', () => {
//   beforeEach(() => cy.visit('http://localhost:4200/signup'));

//   it('should display the header', () => {
//     cy.get('h1').contains('Create New Account');
//   });

//   it('should navigate to login page', () => {
//     cy.get('a').contains('Login').click();
//     cy.url().should('include', 'login');
//   });

//   it('should display a correct input form', () => {
//     cy.get('input[name="username"]').should('exist').should('be.visible');
//     cy.get('input[name="email_address"]').should('exist').should('be.visible');
//     cy.get('input[name="password"]').should('exist').should('be.visible');
//     cy.get('input[name="confirm_password"]').should('exist').should('be.visible');
//     cy.get('button[type="submit"]').should('exist').should('be.visible').contains('Create Account');
//   });

//   it('should display link to continue as guest', () => {
//     cy.get('a').contains('Continue as guest').click();
//   });

//   it('should prevent form submission with invalid input', () => {
//     cy.get('input[name="username"]').type('us');
//     cy.get('input[name="email_address"]').type('invalid_email');
//     cy.get('input[name="password"]').type('pass');
//     cy.get('input[name="confirm_password"]').type('pass');
//     cy.get('button[type="submit"]').click();
//     cy.url().should('include', 'signup');
//   });
// });

// describe('Profile Tests', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:4200/profile');
//   });

//   it('displays user profile information', () => {
//     cy.get('h2').should('be.visible');
//     cy.get('h2').should('contain', 'John Doe');
//     cy.get('p').should('contain', 'jdoe');
//   });

//   it('opens edit profile modal', () => {
//     cy.get('#edit-profile-button').click();
//     cy.get('input[name="name"]').type('Simphiwe');
//     cy.get('input[name="email"]').type('simphiwe@example.com');
//     cy.get('edit-modal').get('button').contains('Save Changes').click();
//   });

//   it('opens the saved recipes tab', () => {
//     cy.get('a').contains('Saved').click();
//     cy.get('div').contains('Sort')
//   });

//   it('opens the meal plan tab', () => {
//     cy.get('a').contains('Meal Plan').click();
//     cy.get('div').contains('Breakfast')
//   });

//   it('opens the created recipes tab', () => {
//     cy.get('a').contains('Created').click();
//     cy.get('div').contains('Sort')
//   });

//   it('opens edit settings modal', () => {
//     cy.get('#settings-button').click();
//     cy.get('settings-modal').get('button').contains('Logout').click();
//   });

//   it('opens notifications page', () => {
//     cy.get('#notifications-button').click();
//     cy.url().should('include', 'notifications');
//   });
// });

  describe('create tests', () => {
    beforeEach(() => {cy.visit('http://localhost:4200/create');});

    it('enters recipe details', () => {
      
    });
  });

  describe('recipe details tests', () => {
    beforeEach(() => cy.visit('/'));

   });

  describe('home tests', () => {
    beforeEach(() => cy.visit('/'));

  });
