/* eslint-disable no-undef */
/* eslint-disable no-tabs */
it('Should open Books list', () => {
	cy.visit('/booksNode');
	cy.contains('Books list').should('be.visible');
});

it('Should successfully login', () => {
	cy.visit('/booksNode');
	cy.login('test@test.com', 'test');
	cy.contains('Добро пожаловать test@test.com').should('be.visible');
});

it('Should not login with empty login', () => {
	cy.visit('/booksNode');
	cy.contains('Log in').click();
	cy.get('#mail').type(' ');
	cy.get('#pass').type('test');
	cy.contains('Submit').click();
	cy.get('#mail')
		.then(($el) => $el[0].checkValidity())
		.should('be.false');
	cy.get('#mail')
		.then(($el) => $el[0].validationMessage)
		.should('contain', 'Please fill out this field.');
});

it('Should not login with empty password', () => {
	cy.visit('/booksNode');
	cy.contains('Log in').click();
	cy.get('#mail').type('test@test.com');
	cy.contains('Submit').click();
	cy.get('#pass')
		.then(($el) => $el[0].checkValidity())
		.should('be.false');
});

describe.only('Test for favorite', () => {
	beforeEach(() => {
		// cy.viewport(Cypress.env('viewportHeight'), Cypress.env('viewportWidth'));
		cy.visit('/booksNode');
		cy.login('test@test.com', 'test');
		cy.contains('Добро пожаловать test@test.com').should('be.visible');
	});

	it('Should add new book to favorite', () => {
		cy.addNewFavoriteBook(
			'Сказочный патруль',
			'История о новых приключениях сказочного патруля',
			'Димон и КО'
		);
	});

	it('Should delete book from favorite', () => {
		cy.addNewFavoriteBook(
			'Курс Нетологии в PDF',
			'Некий курс весь и сразу',
			'Пиратико'
		);
		cy.contains('Delete from favorite').click();
		cy.contains('Add to favorite').should('be.visible');
	});

	it('Should add book to favorite', () => {
		cy.addNewFavoriteBook(
			'Сердце Пармы',
			'Судьба дает выбор, но настоящий выбор только один',
			'Алексей Иванов'
		);
		cy.contains('Delete from favorite').click();
		cy.contains('Add to favorite').click();
		cy.contains('Delete from favorite').should('be.visible');
	});
});
