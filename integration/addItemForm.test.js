describe('addItemForm', () => {
    it('base addItemForm basic, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-basic&viewMode=story');
        const image = await page.screenshot();
         expect(image).toMatchImageSnapshot();
    });
 });
 