import { Selector } from 'testcafe';

fixture `todo app test`
    .page `http://localhost:5173`;


test('Add a new todo item and remove', async t => {
    await t
        .typeText('#todo-input', 'New todo item')
        .click('#todo-button')
        .expect(Selector('#todo-list li').withText('New todo item').exists).ok()
        .click(Selector('#todo-list > li > button').withText('Remove'))
        .expect(Selector('#todo-list li').withText('New todo item').exists).notOk()
});


test('darkmode toggle', async t => {
    await t 
        .click('#lightDarkMode')
        .expect(Selector('body').hasClass('dark')).ok()
        .click('#lightDarkMode')
        .expect(Selector('body').hasClass('dark')).notOk()
});


test('Add a new todo item with due date and check overdue', async t => {
    await t
        .typeText('#todo-input', 'New todo item')
        .typeText('#date-input', '2023-01-01')
        .click('#todo-button')
        .expect(Selector('#todo-list li').withText('New todo item').exists).ok()
        .expect(Selector('#todo-list li').withText('New todo item').hasClass('overdue')).ok()
});

test('Add a new todo item with due date and check due', async t => {
    await t
        .typeText('#todo-input', 'New todo item')
        .typeText('#date-input', '2028-12-29')
        .click('#todo-button')
        .expect(Selector('#todo-list li').withText('New todo item').exists).ok()
        .expect(Selector('#todo-list li').withText('New todo item').hasClass('due')).ok()
});

test('Add a new todo item and toggle completion', async t => {
    await t
        .typeText('#todo-input', 'New todo item')
        .click('#todo-button')
        .expect(Selector('#todo-list li').withText('New todo item').exists).ok()
        .click(Selector('#todo-list > li > button').withText('Done'))
        .expect(Selector('#todo-list li').withText('New todo item').hasClass('completed')).ok()
        .click(Selector('#todo-list > li > button').withText('Not Done'))
        .expect(Selector('#todo-list li').withText('New todo item').hasClass('completed')).notOk()
});