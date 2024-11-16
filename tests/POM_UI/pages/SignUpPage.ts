import { test, expect } from '@playwright/test';
import ErrorsComponent from "../components/errors.component";
require('dotenv').config();

class SignUpPage {
    nameField: any;
    lastnameField: any;
    emailField: any;
    passwordField: any;
    repeatpasswordField: any;
    registerButton: any;
    errors:any;
    page: any;

    constructor(page) {
        this.page = page;

        this.nameField = page.locator('[id="signupName"]');
        this.lastnameField = page.locator('[id="signupLastName"]');
        this.emailField = page.locator('[id="signupEmail"]');
        this.passwordField = page.getByLabel('Password', { exact: true });
        this.repeatpasswordField = page.getByLabel('Re-enter password', { exact: true });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.errors = new ErrorsComponent(page);
    }

    async navigate() {

       // await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');

       const fullUrl = `${process.env.BASE_URL.replace('https://', `https://${process.env.HTTP_USER_NAME}:${process.env.HTTP_PASSWORD}@`)}`;

        await this.page.goto(fullUrl);
        await this.page.getByRole('button', { name: 'Sign up' }).click();

    }

    async signup(name,lastname,email,password,repeatpassword){
        await this.nameField.fill(name)
        await this.lastnameField.fill(lastname)
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.repeatpasswordField.fill(repeatpassword)
        await this.registerButton.click()
    }
    async fillIn(name,lastname,email,password,repeatpassword){
        await this.nameField.fill(name)
        await this.lastnameField.fill(lastname)
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.repeatpasswordField.fill(repeatpassword)
    }

    async emptyPas(name,lastname,email){
        await this.nameField.fill(name)
        await this.lastnameField.fill(lastname)
        await this.emailField.fill(email)
    }

    async notrepeatPassw(name,lastname,email,password){
        await this.nameField.fill(name)
        await this.lastnameField.fill(lastname)
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
    }

    async nameEnter(name) {
        await this.nameField.fill(name)
    }
    async lastnameEnter(lastname) {
        await this.lastnameField.fill(lastname)
    }

    async lastNameFocus(){
        await this.lastnameField.focus();
    }

    async emailFocus(){
        await this.emailField.focus();
    }
    async passFocus(){
        await this.passwordField.focus();
    }
    async pass2Focus(){
        await this.repeatpasswordField.focus();
    }

    async passErrorM() {
        return await this.errors.passwErM();
    }
    async passE() {
        return await this.errors.passEmError();
    }
    async passI() {
        return await this.errors.passInError();
    }
    async nameError() {
        return await this.errors.nameInvalidError();
    };
    async lastnameError() {
        return await this.errors.lastnameInvalidError();
    }
}

module.exports = SignUpPage;