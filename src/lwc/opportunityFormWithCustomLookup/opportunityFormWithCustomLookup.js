import {
  LightningElement,
  track,
  api
} from "lwc";
import {
  NavigationMixin
} from "lightning/navigation";

export default class OpportunityFormWithCustomLookup extends NavigationMixin(
  LightningElement
) {
  @api title = "Create Opportunity";
  @track selectedAccountRecord;
  @track isLoaded = false;

  handlelookupselectaccount(event) {
      this.selectedAccountRecord = event.detail;

  }

  opportunityCancel(){
      this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes: {
              objectApiName: "Opportunity",
              actionName: "home"
            }
          });
  }

  opportunityCreateSuccess(event){
      this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
              recordId: event.detail,
              objectApiName: "Opportunity", // objectApiName is optional
              actionName: "view"
            }
          });

  }
  }