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
  beforeEach(() => cy.visit('/'));

  it('successfully loads signup', () => {
    cy.get('h1').contains('Hey, Welcome Back');
  });

  it('should attempt signup', () => {
    cy.fixture('user-details.json').then((userData) => {
      cy.get('input[name="username"]').type(userData.username);
      cy.get('input[name="password"]').type(userData.password);
      cy.get('button').click();
      cy.url().contains('profile');
    });
  });

  it('should navigate to login', () => {
    cy.get('button').click();
    cy.url().contains('login');
  });
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
