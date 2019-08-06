import { LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class createManyOpps extends LightningElement {
     @track value;
     @track status;

        @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
        objectInfo;

        @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STAGE_FIELD})
        StagePicklistValues;

        //in 'c:createOpp' [Cannot read property 'data' of undefined]

        handleChange(event) {
            this.value = event.detail.value;
            this.status = this. value;
            console.log(this.status);
        }

        options = [
              { label: 'Example Account1', value: 'Acc1' },
              { label: 'Example Account2', value: 'Acc2' },
            ];

            // Select option1 by default
            @track
            value = 'option1';

            handleChangeCheckbox(event) {
                const changeValue = event.detail.value;
                alert(changeValue);
            }

            handleCreate() {
                 alert('Opportunities created successfully!');
               }
     }