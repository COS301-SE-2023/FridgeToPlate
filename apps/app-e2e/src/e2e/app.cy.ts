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
      cy.get('button').click();
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

  describe('profile tests', () => {
    beforeEach(() => cy.visit('http://localhost:4200/profile'));

    it('displays profile information correctly', () => {
      // Check that the profile name, username, and email are displayed correctly
      cy.contains('John Doe');
      cy.contains('jdoe');
    });

    it('opens edit profile modal when edit button is clicked', () => {
      // Click the edit button and check that the modal is displayed
      cy.get('#editButton').click();
      cy.get('#editModal').should('be.visible');
    });

    it('opens settings modal when settings button is clicked', () => {
      // Click the edit button and check that the modal is displayed
      cy.get('#settingsButton').click();
      cy.get('#settingsModal').should('be.visible');
    });

    it('updates profile display name when save button is clicked', () => {
      // Click the edit button, update the profile information, and click save
      cy.get('#editButton').click();
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('input[name="name"]').clear().type('Jane Doe');
      cy.get('button').contains('Save Changes').click();

      cy.contains('Jane Doe');
    });

    it('updates profile email when save button is clicked', () => {
      // Click the edit button, update the profile information, and click save
      cy.get('#editButton').click();
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('input[name="email"]').clear().type('janedoe@gmail.com');
      cy.get('button').contains('Save Changes').click();

      
      cy.get('#editButton').click();
      cy.get('input[name="email"]').should('have.value', 'janedoe@gmail.com');
    });

    it('should not update profile when close button is clicked', () => {
      // Click the edit button, update the profile information, and click save
      cy.get('#editButton').click();
      cy.get('input[name="name"]').clear().type('Jane Doe');
      cy.get('input[name="email"]').clear().type('janedoe@gmail.com');
      cy.get('#closeEditButton').click();

      //details unchanged on page
      cy.contains('John Doe');
      cy.contains('jdoe');
      
      //details unchanged on modal
      cy.get('#editButton').click();
      cy.get('input[name="name"]').should('have.value', 'John Doe');
      cy.get('input[name="email"]').should('have.value', 'jdoe@gmail.com');
    });
  });

  describe('create tests', () => {
    beforeEach(() => {cy.visit('http://localhost:4200/create');});

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

//     it('should display an error message for invalid data', () => {
//       // Fill in the form fields with invalid data
//       cy.get('[data-testid="recipe-name-input"]').type(''); // Empty recipe name
//       cy.get('[data-testid="servings-input"]').type('0'); // Zero servings

//       // Submit the form
//       cy.get('[data-testid="submit-button"]').click();

//       // Assert that the error message is displayed
//       cy.contains('Please fill in all required fields.').should('exist');
//     });
  });

// describe('recommend tests', () => {
//   beforeEach(() => cy.visit('/recommend'));

//   it('should display the first step of the form by default', () => {
//     cy.get('[data-cy=recipe-form-step-1]').should('be.visible');
//   });

//   it('should allow the user to navigate to the next step of the form', () => {
//     cy.get('[data-cy=next-step-button]').click();
//     cy.get('[data-cy=recipe-form-step-2]').should('be.visible');
//   });

//   it('should allow the user to submit the form', () => {
//     cy.get('[data-cy=next-step-button]').click();
//     cy.get('[data-cy=submit-button]').click();
//     cy.url().should('include', '/recipe-submitted');
//   });

//   it('should allow the user to search for recipes by keyword', () => {
//     cy.get('[data-cy=search-input]').type('chicken');
//     cy.get('[data-cy=search-button]').click();
//     cy.get('[data-cy=recipe-card]').should('have.length', 2);
//   });

//   it('should allow the user to filter recipes by cuisine', () => {
//     cy.get('[data-cy=cuisine-filter]').select('Italian');
//     cy.get('[data-cy=recipe-card]').should('have.length', 1);
//   });

//   it('should allow the user to filter recipes by dietary restrictions', () => {
//     cy.get('[data-cy=dietary-restrictions-filter]').select('Vegetarian');
//     cy.get('[data-cy=recipe-card]').should('have.length', 2);
//   });

//   it('should display a list of ingredients', () => {
//     cy.get('[data-cy=ingredient-item]').should('have.length', 4);
//   });

//   it('should allow the user to filter ingredients by name', () => {
//     cy.get('[data-cy=name-filter-input]').type('chicken');
//     cy.get('[data-cy=ingredient-item]').should('have.length', 1);
//   });

//   it('should allow the user to sort ingredients by quantity', () => {
//     cy.get('[data-cy=quantity-sort-select]').select('quantity-asc');
//     cy.get('[data-cy=ingredient-item]').first().contains('Chicken');
//   });

//   it('should display the diet preference name', () => {
//     cy.get('[data-cy=diet-pill]').should('contain', 'Vegan');
//   });

//   it('should change background color when clicked', () => {
//     cy.get('[data-cy=diet-pill]').click();
//     cy.get('[data-cy=diet-pill]').should('have.class', 'bg-primary-highlight');
//   });
// });

// // describe('details tests', () => {
// //   beforeEach(() => cy.visit('/'));

// //   it('displays recipe details', () => {
// //     cy.get('[data-cy=recipe-name]').should('be.visible');
// //     cy.get('[data-cy=recipe-image]').should('be.visible');
// //     cy.get('[data-cy=recipe-ingredients]').should('be.visible');
// //     cy.get('[data-cy=recipe-instructions]').should('be.visible');
// //     cy.get('[data-cy=recipe-tags]').should('be.visible');
// //     cy.get('[data-cy=recipe-difficulty]').should('be.visible');
// //     cy.get('[data-cy=recipe-prep-time]').should('be.visible');
// //     cy.get('[data-cy=recipe-servings]').should('be.visible');
// //   });

// //   it('allows users to submit a review', () => {
// //     cy.get('[data-cy=review-rating]').click({ multiple: true }).last().click();
// //     cy.get('[data-cy=review-description]').type('This recipe was amazing!');
// //     cy.get('[data-cy=submit-review]').click();
// //     cy.get('[data-cy=review-description]').should('have.value', '');
// //     cy.get('[data-cy=reviews]').contains('This recipe was amazing!');
// //   });

// //   it('allows users to bookmark a recipe', () => {
// //     cy.get('[data-cy=bookmark-button]').click();
// //     cy.get('[data-cy=bookmark-icon]').should('have.class', 'ion-icon-filled');
// //     cy.get('[data-cy=bookmark-button]').click();
// //     cy.get('[data-cy=bookmark-icon]').should('have.class', 'ion-icon-outline');
// //   });
// // });
