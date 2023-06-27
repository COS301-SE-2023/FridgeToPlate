import { getGreeting } from '../support/app.po';

describe('login', () => {
  beforeEach(() => cy.visit('/'));

  it('successfully loads login', () => {
    cy.get('h1').contains('Hey, Welcome Back');
  });

  it('should prevent incorrect login attempt', () => {
    cy.get('input[name="username"]').type('12344321');
    cy.get('input[name="password"]').type('12344321');
  });
});
