describe('editableSpan', () => {
	it('editableSpan basic, visually looks correct', async () => {
		await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-editablespan--editable-span-basic&viewMode=story')
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot()
	})
})
