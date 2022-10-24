describe('app', () => {
	it('app, visually looks correct', async () => {
		await page.goto('http://localhost:9009/iframe.html?args=&id=app--app-basic&viewMode=story')
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot()
	})
})
