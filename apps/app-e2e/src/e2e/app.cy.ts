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

    it('displays profile information correctly', () => {
      // Check that the profile name, username, and email are displayed correctly
      cy.get('[data-testid="profile-name"]').should('contain', 'John Doe');
      cy.get('[data-testid="profile-username"]').should('contain', 'johndoe');
      cy.get('[data-testid="profile-email"]').should('contain', 'johndoe@example.com');
    });

    it('opens edit profile modal when edit button is clicked', () => {
      // Click the edit button and check that the modal is displayed
      cy.get('[data-testid="edit-profile-button"]').click();
      cy.get('[data-testid="edit-profile-modal"]').should('be.visible');
    });

    it('updates profile information when save button is clicked', () => {
      // Click the edit button, update the profile information, and click save
      cy.get('[data-testid="edit-profile-button"]').click();
      cy.get('[data-testid="edit-profile-name-input"]').clear().type('Jane Doe');
      cy.get('[data-testid="edit-profile-username-input"]').clear().type('janedoe');
      cy.get('[data-testid="edit-profile-email-input"]').clear().type('janedoe@example.com');
      cy.get('[data-testid="edit-profile-save-button"]').click();

      // Check that the profile information is updated
      // cy.get('[data-testid="profile-name"]').should('contain', 'Jane Doe');
      // cy.get('[data-testid="profile-username"]').should('contain', 'janedoe');
      // cy.get('[data-testid="profile-email"]').should('contain', 'janedoe@example.com');
    });

    it('opens settings modal when settings button is clicked', () => {
      // Click the settings button and check that the modal is displayed
      cy.get('[data-testid="settings-button"]').click();
      cy.get('[data-testid="settings-modal"]').should('be.visible');
    });

    it('updates notification preferences when checkboxes are clicked', () => {
      // Click the settings button, update the notification preferences, and click close
      cy.get('[data-testid="settings-button"]').click();
      cy.get('[data-testid="dark-mode-checkbox"]').check();
      cy.get('[data-testid="review-notifications-checkbox"]').uncheck();
      cy.get('[data-testid="view-notifications-checkbox"]').check();
      cy.get('[data-testid="recommendation-notifications-checkbox"]').uncheck();
      cy.get('[data-testid="settings-close-button"]').click();

      // Check that the notification preferences are updated
      cy.get('[data-testid="dark-mode-indicator"]').should('be.visible');
      cy.get('[data-testid="review-notifications-indicator"]').should('not.be.visible');
      cy.get('[data-testid="view-notifications-indicator"]').should('be.visible');
      cy.get('[data-testid="recommendation-notifications-indicator"]').should('not.be.visible');
    });
  });

  describe('create tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should create a new recipe with valid data', () => {
      const recipeName = 'Test Recipe';
      const description = 'This is a test recipe';
      const servings = '4';
      const prepTime = '30 minutes';
      const ingredients = [
        '1 cup flour',
        '1/2 cup sugar',
        '1/4 cup butter',
        '1 egg',
        '1 tsp vanilla extract'
      ];
      const instructions = [
        'Preheat oven to 350°F',
        'Mix flour and sugar in a bowl',
        'Cut in butter until mixture resembles coarse crumbs',
        'Add egg and vanilla extract; mix well',
        'Drop by spoonfuls onto greased baking sheet',
        'Bake for 15-20 minutes or until golden brown'
      ];
      const mealType = 'Dessert';
      const tags = ['Test', 'Cypress'];

      // Fill in the form fields
      cy.get('[data-testid="recipe-name-input"]').type(recipeName);
      cy.get('[data-testid="description-input"]').type(description);
      cy.get('[data-testid="servings-input"]').type(servings);
      cy.get('[data-testid="prep-time-input"]').type(prepTime);
      cy.get('[data-testid="ingredients-input"]').type(ingredients.join('\n'));
      cy.get('[data-testid="instructions-input"]').type(instructions.join('\n'));
      cy.get('[data-testid="meal-type-input"]').select(mealType);
      cy.get('[data-testid="tags-input"]').type(tags.join(', '));

      // Upload image
      cy.fixture('test-image.jpg').then((fileContent) => {
        cy.get('[data-testid="image-input"]').upload({ fileContent, fileName: 'test-image.jpg', mimeType: 'image/jpeg' });
      });

      // Submit the form
      cy.get('[data-testid="submit-button"]').click();

      // Assert that the recipe was created successfully
      cy.url().should('include', '/recipes/');
      cy.contains(recipeName).should('exist');
      cy.contains(description).should('exist');
      cy.contains(servings).should('exist');
      cy.contains(prepTime).should('exist');
      cy.contains(mealType).should('exist');
      cy.contains(tags[0]).should('exist');
      cy.contains(tags[1]).should('exist');
    });

    it('should display an error message for invalid data', () => {
      // Fill in the form fields with invalid data
      cy.get('[data-testid="recipe-name-input"]').type(''); // Empty recipe name
      cy.get('[data-testid="servings-input"]').type('0'); // Zero servings

      // Submit the form
      cy.get('[data-testid="submit-button"]').click();

      // Assert that the error message is displayed
      cy.contains('Please fill in all required fields.').should('exist');
    });
  });

describe('generate tests', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the first step of the form by default', () => {
    cy.get('[data-cy=recipe-form-step-1]').should('be.visible');
  });

  it('should allow the user to navigate to the next step of the form', () => {
    cy.get('[data-cy=next-step-button]').click();
    cy.get('[data-cy=recipe-form-step-2]').should('be.visible');
  });

  it('should allow the user to submit the form', () => {
    cy.get('[data-cy=next-step-button]').click();
    cy.get('[data-cy=submit-button]').click();
    cy.url().should('include', '/recipe-submitted');
  });

  it('should allow the user to search for recipes by keyword', () => {
    cy.get('[data-cy=search-input]').type('chicken');
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=recipe-card]').should('have.length', 2);
  });

  it('should allow the user to filter recipes by cuisine', () => {
    cy.get('[data-cy=cuisine-filter]').select('Italian');
    cy.get('[data-cy=recipe-card]').should('have.length', 1);
  });

  it('should allow the user to filter recipes by dietary restrictions', () => {
    cy.get('[data-cy=dietary-restrictions-filter]').select('Vegetarian');
    cy.get('[data-cy=recipe-card]').should('have.length', 2);
  });

  it('should display a list of ingredients', () => {
    cy.get('[data-cy=ingredient-item]').should('have.length', 4);
  });

  it('should allow the user to filter ingredients by name', () => {
    cy.get('[data-cy=name-filter-input]').type('chicken');
    cy.get('[data-cy=ingredient-item]').should('have.length', 1);
  });

  it('should allow the user to sort ingredients by quantity', () => {
    cy.get('[data-cy=quantity-sort-select]').select('quantity-asc');
    cy.get('[data-cy=ingredient-item]').first().contains('Chicken');
  });

  it('should display the diet preference name', () => {
    cy.get('[data-cy=diet-pill]').should('contain', 'Vegan');
  });

  it('should change background color when clicked', () => {
    cy.get('[data-cy=diet-pill]').click();
    cy.get('[data-cy=diet-pill]').should('have.class', 'bg-primary-highlight');
  });
});

describe('details tests', () => {
  beforeEach(() => cy.visit('/'));
});
