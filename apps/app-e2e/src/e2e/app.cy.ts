import { it } from "mocha";

/* eslint-disable cypress/unsafe-to-chain-command */
describe('login tests', () => {
  beforeEach(() => cy.visit('http://localhost:4200/login'));

  it('should display the header', () => {
    cy.get('h1').contains('Hey, Welcome Back');
  });

  it('should display a correct input form', () => {
    cy.get('input[name="username"]').should('exist').should('be.visible');
    cy.get('input[name="password"]').should('exist').should('be.visible');
    cy.get('button[type="submit"]').should('exist').should('be.visible').contains('Login');
  });

  it('should display link to continue as guest', () => {
    cy.get('a').contains('Continue as guest').click();
  });

  it('should navigate to signup', () => {
    cy.get('a').contains('Create').click();
    cy.url().should('include', 'signup');
  });

  it('should prevent incorrect login attempt', () => {
    cy.fixture('user-details.json').then((userData) => {
      cy.get('input[name="username"]').type(userData[0].username);
      cy.get('input[name="password"]').type(userData[0].password);
      cy.get('button').contains('Login').click();
      cy.url().should('include', 'login');
    });
  });
});

describe('signup tests', () => {
  beforeEach(() => cy.visit('http://localhost:4200/signup'));

  it('should display the header', () => {
    cy.get('h1').contains('Create New Account');
  });

  it('should navigate to login page', () => {
    cy.get('a').contains('Login').click();
    cy.url().should('include', 'login');
  });

  it('should display a correct input form', () => {
    cy.get('input[name="username"]').should('exist').should('be.visible');
    cy.get('input[name="email_address"]').should('exist').should('be.visible');
    cy.get('input[name="password"]').should('exist').should('be.visible');
    cy.get('input[name="confirm_password"]').should('exist').should('be.visible');
    cy.get('button[type="submit"]').should('exist').should('be.visible').contains('Create Account');
  });

  it('should display link to continue as guest', () => {
    cy.get('a').contains('Continue as guest').click();
  });

  it('should prevent form submission with invalid input', () => {
    cy.get('input[name="username"]').type('us');
    cy.get('input[name="email_address"]').type('invalid_email');
    cy.get('input[name="password"]').type('pass');
    cy.get('input[name="confirm_password"]').type('pass');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'signup');
  });
});

describe('Profile Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/profile');
  });

  it('displays user profile information', () => {
    cy.get('h2').should('be.visible');
    cy.get('h2').should('contain', 'John Doe');
    cy.get('p').should('contain', 'jdoe');
  });

  it('opens edit profile modal', () => {
    cy.get('#edit-profile-button').click();
    cy.get('input[name="name"]').type('Simphiwe');
    cy.get('input[name="email"]').type('simphiwe@example.com');
    cy.get('edit-modal').get('button').contains('Save Changes').click();
  });

  it('opens the saved recipes tab', () => {
    cy.get('a').contains('Saved').click();
    cy.get('div').contains('Sort')
  });

  it('opens the meal plan tab', () => {
    cy.get('a').contains('Meal Plan').click();
    cy.get('div').contains('Breakfast')
  });

  it('opens the created recipes tab', () => {
    cy.get('a').contains('Created').click();
    cy.get('div').contains('Sort')
  });

  it('opens edit settings modal', () => {
    cy.get('#settings-button').click();
    cy.get('settings-modal').get('button').contains('Logout').click();
  });

  it('opens notifications page', () => {
    cy.get('#notifications-button').click();
    cy.url().should('include', 'notifications');
  });
});

  describe('create tests', () => {
    beforeEach(() => {cy.visit('http://localhost:4200/create');});

    it('enters recipe details', () => {
      cy.get('#name').type('Egg Salad');
      cy.get('#description').type('A delicious egg salad recipe');
      cy.get('#servings').type('4');
      cy.get('#preparation-time').type('10');
      cy.get('div').contains('Ingredients').get('button').contains('Add').click();
      // cy.get('label').contains('Ingredients').type('Crack eggs');
      cy.get('div').contains('Instructions').get('button').contains('Add').click();
      // cy.get('#instruction-0').type('Crack eggs');
      cy.get('#tag').type('Vegan');
      cy.get('button').contains('Add').click();
    });
  });

  // describe('recipe details tests', () => {
  //   beforeEach(() => cy.visit('http://localhost:4200/recipe/by0r-0Bo5t-D3se00'));

  //   it('goes to previous page', () => {
  //     cy.get('#back-button').click();
  //   });

  //   it('displays the recipe details', () => {
  //     cy.get('p').contains('Prep Time');
  //     cy.get('p').contains('Ingredients');
  //     cy.get('p').contains('Servings');
  //     cy.get('ion-label').contains('Ingredients');
  //     cy.get('ion-label').contains('Instructions');
  //     cy.get('h1').contains('Reviews');
  //   });

  //   it('adds a review', () => {
  //     cy.get('ion-textarea').click();
  //     cy.get('ion-textarea').type('NOT SO GOOD STUFF!!!');
  //     cy.get('ion-icon[name="star"]:nth-child(2)').click();
  //     cy.get('ion-button.review-button').click();
  //   });

  //  });

  // describe('home tests', () => {
  //   beforeEach(() => cy.visit('/'));

  // });

  // describe('search tests', () => {
  //   beforeEach(() => cy.visit('/'));

  // });

  // describe('notifications tests', () => {
  //   beforeEach(() => cy.visit('/'));

  // });
// });