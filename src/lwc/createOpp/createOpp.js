/**
 * Created by 212724387 on 08.07.2019.
 */

/*
import { LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import getAccountsList from '@salesforce/apex/AccountController.getAccountsList';


export default class createOpp extends LightningElement {
     @track value;

        @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
        objectInfo;

        @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STAGE_FIELD})
        StagePicklistValues;

        //in 'c:createOpp' [Cannot read property 'data' of undefined]

        handleChange(event) {
            this.value = event.detail.value;
        }

        options = [
              { label: 'Ross', value: 'option1' },
              { label: 'Rachel', value: 'option2' },
            ];

            // Select option1 by default
            @track
            value = 'option1';

            handleChangeCheckbox(event) {
                const changeValue = event.detail.value;
                alert(changeValue);
            }

            @track accounts;
            @track error;
*/
/*                @track error;

                @wire(getAccountsList)
                wiredAccounts({ error, data }) {
                    if (data) {
                        this.accounts = data;
                        this.error = undefined;
                    } else if (error) {
                        this.accounts = error;
                        this.contacts = undefined;
                    }
                }*//*

                    */
/*trackValue(){
                       getAccountsList().then(result => {
                                                                           console.log(result);
                                                                          this.accounts = result;



                                                                          this.error = undefined;
                                                                      })
                                                                      .catch(error => {
                                                                          this.error = error;
                                                                          console.log('ERROR ' + error);
                                                                      });


                    }*//*

                    //spr czy działa
        }



*/