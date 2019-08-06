import { LightningElement, track } from 'lwc';
export default class HelloWorld extends LightningElement {
    @track greeting = 'World';
    changeHandler(event) {
        this.greeting = event.target.value;
    }

    //get field value
    //https://salesforce.stackexchange.com/questions/255430/how-do-i-fetch-the-one-field-value-using-lightning-web-components
}