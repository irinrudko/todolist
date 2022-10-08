describe('task', () => {
    it('task is done, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-task--task-is-done');
        const image = await page.screenshot();
         expect(image).toMatchImageSnapshot();
    });

    it('task is not done, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-task--task-is-not-done');
        const image = await page.screenshot();
         expect(image).toMatchImageSnapshot();
    });
});
 