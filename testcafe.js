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
