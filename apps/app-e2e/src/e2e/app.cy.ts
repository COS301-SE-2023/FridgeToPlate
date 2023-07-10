import { data } from 'cypress/types/jquery';
import { getGreeting } from '../support/app.po';

describe('login tests', () => {
  beforeEach(() => cy.visit('/'));

  it('successfully loads login', () => {
    cy.get('h1').contains('Hey, Welcome Back');
  });

  it('should prevent incorrect login attempt', () => {
    cy.fixture('user-details.json').then((userData) => {
      cy.get('input[name="username"]').type(userData.username);
      cy.get('input[name="password"]').type(userData.password);
      cy.get('button').click();
      cy.url().contains('profile');
    });
  });

  it('should attempt login', () => {
    cy.get('input[name="username"]').type('smileyazola@gmail.com');
    cy.get('input[name="password"]').type('randomPassword!');
    cy.get('button').click();
    cy.url().contains('profile');
  });

  it('should navigate to signup', () => {
    cy.get('button').click();
    cy.url().contains('signup');
  });
});

describe('signup tests', () => {
  beforeEach(() => cy.visit('/signup'));

  it('should display the header', () => {
    cy.get('h1').should('contain', 'Create New Account');
  });

  it('should display link to login page', () => {
    cy.get('a').contains('Already have an account?').should('have.attr', 'href', '/login');
  });

  it('should display a username input field', () => {
    cy.get('input[name="username"]').should('exist').should('be.visible');
  });

  it('should display an email address input field', () => {
    cy.get('input[name="email_address"]').should('exist').should('be.visible');
  });

  it('should display a password input field', () => {
    cy.get('input[name="password"]').should('exist').should('be.visible');
  });

  it('should display a confirm password input field', () => {
    cy.get('input[name="confirm_password"]').should('exist').should('be.visible');
  });

  it('should display a Create Account button', () => {
    cy.get('button[type="submit"]').should('exist').should('be.visible').contains('Create Account');
  });

  it('should display link to continue as guest', () => {
    cy.get('a').contains('Continue as guest').should('have.attr', 'href', '/guest');
  });

  it('should prevent form submission with invalid input', () => {
    cy.get('input[name="username"]').type('us');
    cy.get('input[name="email_address"]').type('invalid_email');
    cy.get('input[name="password"]').type('pass');
    cy.get('input[name="confirm_password"]').type('pass');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/signup');
  });

  it('should successfully submit form with valid input', () => {
    cy.get('input[name="username"]').type('john_doe');
    cy.get('input[name="email_address"]').type('john_doe@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirm_password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');
  });
});

  it('should navigate to login', () => {
    cy.get('button').click();
    cy.url().contains('login');
  });

describe('profile tests', () => {
  beforeEach(() => cy.visit('/'));
});

describe('create tests', () => {
  beforeEach(() => cy.visit('/'));
});

describe('generate tests', () => {
  beforeEach(() => cy.visit('/'));
});

describe('details tests', () => {
  beforeEach(() => cy.visit('/'));
});
