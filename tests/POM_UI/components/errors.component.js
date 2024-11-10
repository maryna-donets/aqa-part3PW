class ErrorsComponent {
	constructor(page) {
		this.page = page;
		this.passwNotMatch = page
			.locator('input[id="signupRepeatPassword"]')
			.locator("~ .invalid-feedback");
		this.passEmptyLocator = page
			.locator('input[id="signupPassword"]')
			.locator("~ .invalid-feedback");
		this.passInvalidLocator = page
			.locator('input[id="signupPassword"]')
			.locator("~ .invalid-feedback");
         this.nameInvalidLocator = page
			.locator('[id="signupName"]')
        this.lastnameInvalidLocator = page
			.locator('[id="signupLastName"]');
	}
	async passwErM() {
		return await this.passwNotMatch.textContent();
	}

	async passEmError() {
		return await this.passEmptyLocator.textContent();
	}

	async passInError() {
		return await this.passInvalidLocator.textContent();
	}

    async nameInvalidError() {
		return await this.nameInvalidLocator.textContent();
	}
    async lastnameInvalidError() {
		return await this.lastnameInvalidLocator.textContent();
	}
}
module.exports = ErrorsComponent;
