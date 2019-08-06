 import { LightningElement, track, api } from 'lwc';  
 import getAccountsList from '@salesforce/apex/ManageRecordsController.getAccountsList';  
 import getAccountsCount from '@salesforce/apex/ManageRecordsController.getAccountsCount';  
 export default class RecordList extends LightningElement {  
   @api recordsCount;
   @track accounts;
   @track error;  
   @api currentpage;  
   pagesize = 5;
   @track searchKey;  
   @track totalpages;
   @track totalrecords;
   localCurrentPage = null;  
   isSearchChangeExecuted = false;  
   // not yet implemented  
   pageSizeOptions =  
     [  
       { label: '5', value: 5 },  
       { label: '10', value: 10 },  
       { label: '25', value: 25 },  
       { label: '50', value: 50 },  
       { label: 'All', value: '' },  
     ];  
   handleKeyChange(event) {  
     if (this.searchKey !== event.target.value) {  
       this.isSearchChangeExecuted = false;  
       this.searchKey = event.target.value;  
       this.currentpage = 1;  
     }  
   }  
   renderedCallback() {  
     // This line added to avoid duplicate/multiple executions of this code.  
     if (this.isSearchChangeExecuted && (this.localCurrentPage === this.currentpage)) {  
       return;  
     }  
     this.isSearchChangeExecuted = true;  
     this.localCurrentPage = this.currentpage;
     console.log( "Type" + this.name);
     getAccountsCount({ searchString: this.searchKey })  
       .then(recordsCount => {  
         this.totalrecords = recordsCount;
         console.log(recordsCount);
         if (recordsCount !== 0 && !isNaN(recordsCount)) {
             console.log(recordsCount);
             console.log(this.pageSize);
           this.totalpages = Math.ceil(recordsCount / this.pagesize);  
           console.log(this.totalpages);
           console.log("current page" + this.currentpage);
           console.log("record count" + recordsCount);
           console.log("searchkey:" + this.searchKey);
           getAccountsList({ pagenumber: this.currentpage, numberOfRecords: recordsCount, pageSize: 5, searchString: this.searchKey })
             .then(accountList => {  
               this.accounts = accountList;
               console.log(this.accounts);
               console.log(accountList);
               this.error = undefined;  
             })  
             .catch(error => {  
               this.error = error;  
               this.accounts = undefined;  
             });  
         } else {  
           this.accounts = [];  
           this.totalpages = 1;  
           this.totalrecords = 0;  
         }  
         const event = new CustomEvent('recordsload', {  
           detail: recordsCount  
         });  
         this.dispatchEvent(event);  
       })  
       .catch(error => {  
         this.error = error;  
         this.totalrecords = undefined;  
       });  
   }  
 }  