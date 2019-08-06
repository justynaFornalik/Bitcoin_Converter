/**
 * Created by 212724387 on 07.07.2019.
 */

 //WHAT accuracy (decimal places should we have?

import {LightningElement, track, wire} from 'lwc';
import getTheValueOfOneBitcoinInUSD from '@salesforce/apex/BitcoinToUSDConvertor.getTheValueOfOneBitcoinInUSD';
import getRate from '@salesforce/apex/ConvertorHelper.getRate';
//import BitcoinToUSDConvertor2 from '@salesforce/apex/BitcoinToUSDConvertor2.BitcoinToUSDConvertor2';

export default class Converter extends LightningElement {
    @track bitcoinInUSD;
    @track valueOfUSDAfterCalculation;
    @track valueOfBcAfterCalculation;
    //@wire(getTheValueOfOneBitcoinInUSD) valueOfOneBitcoinInUSD;
    @wire(getRate) valueOfOneBitcoinInUSD;
    @track usdInputValue;
    @track usdInBitcoins;



    @track error;
    @track bitcoinValue;
    connectedCallback() {
            this.trackValue();
        }

    changeHandler(event) {
        this.bitcoinValue = event.target.value;
        //var convertor = new BitcoinToUSDConvertor2();
        //this.bitcoinInUSD = this.convertor.valueOfOneBitcoinInUSD;
        //console.log(bitcoinInUSD);
        this.trackValue();
        this.valueOfUSDAfterCalculation = this.calculateValueInUSD(this.bitcoinValue, this.bitcoinInUSD);
        //console.log(valueOfUSDAfterCalculation);
        this.usdInputValue = this.valueOfUSDAfterCalculation.toFixed(3);


    }

    trackValue(){
       getRate().then(result => {
                                                           console.log(result);
                                                          this.bitcoinInUSD = result;



                                                          this.error = undefined;
                                                      })
                                                      .catch(error => {
                                                          this.error = error;
                                                          console.log('ERROR ' + error);
                                                      });


    }

    calculateValueInUSD(value1, value2) {
        return value1*value2;

    }

    usdChangeHandler(event) {
        this.usdInputValue = event.target.value;
        this.trackValue();
        console.log(this.usdInputValue);
        console.log(this.bitcoinInUSD);
        this.usdInBitcoins = this.getUsdInBitcoins(this.bitcoinInUSD);
        console.log(this.usdInBitcoins);
        this.valueOfBcAfterCalculation = this.calculateValueInUSD(this.usdInputValue, this.usdInBitcoins);
        this.bitcoinValue = this.valueOfBcAfterCalculation.toFixed(3);
        //1 usd = 1/bitcoinInUSD
    }

    getUsdInBitcoins(bitcoinInUSD){
        return 1/bitcoinInUSD;
    }
}