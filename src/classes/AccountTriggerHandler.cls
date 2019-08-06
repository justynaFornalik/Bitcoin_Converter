/**
 * Created by 212724387 on 07.07.2019.
 */

public with sharing class AccountTriggerHandler {
    private static final String USD_CODE = 'USD';

    //Do you want it to be updated  also when insert? I assumed yes
    //Are you sure you don't want to use fieldupdate rule?
    //TBD Add exceptions! -> check if currency not usd? / add to page layout only if in usd / for now set company settings currency to USD
    //number out of range -> shorten

    public void onAfterUpdate(Map<Id, Account> oldmap, Map<Id, Account> newmap){
        List<Account> accountsForUpdate = new List<Account>();
        for(Id aId :Trigger.newMap.keySet()){
            if(oldmap.get(aId).AnnualRevenue != newmap.get(aId).AnnualRevenue){

                Account accToUpdate = newmap.get(aId);
                Decimal revenueInBitcoin = calculateAnnualRevenueInBitcoin(accToUpdate.AnnualRevenue);

                Account accToUpdateCopy = new Account();
                accToUpdateCopy.Id = accToUpdate.Id;
                accToUpdateCopy.Annual_Revenue_in_Bitcoin__c = revenueInBitcoin;
                accountsForUpdate.add(accToUpdateCopy);
            }

        }

        if(accountsForUpdate.size()>0){
            update accountsForUpdate;
        }




    }

    public void onAfterInsert(Map<Id, Account> newMap){
        List<Account> accountsForUpdate = new List<Account>();
        for(Id aId :Trigger.newMap.keySet()){
            Account accToUpdate = newmap.get(aId);
            Decimal revenueInBitcoin = calculateAnnualRevenueInBitcoin(accToUpdate.AnnualRevenue);

            Account accToUpdateCopy = new Account();
            accToUpdateCopy.Id = accToUpdate.Id;
            accToUpdateCopy.Annual_Revenue_in_Bitcoin__c = revenueInBitcoin;
            accountsForUpdate.add(accToUpdateCopy);
        }

        if(accountsForUpdate.size()>0){
            update accountsForUpdate;
        }

    }

    public Decimal calculateAnnualRevenueInBitcoin(Decimal revenue){
        Decimal valueOfOneBitcoinInUSD;
        Decimal annualRevenueInBitcoin;

        Currency_Rate__c bitcoinToUSDRate = [
                SELECT id, rate__c, code__c
                FROM Currency_Rate__c
                WHERE code__c = :USD_CODE
        ];

        valueOfOneBitcoinInUSD = bitcoinToUSDRate.Rate__c;
        //add insert to bitcointoUSDConvertor
        //not the following solution because: Callout from triggers are currently not supported.
        /*String externalDataSource = 'https://bitpay.com/api/rates/';
        valueOfOneBitcoinInUSD = BitcoinToUSDConvertor2.getTheValueOfOneBitcoinInUSD(externalDataSource);*/
        /*ConvertorHelper.getTheValueOfOneBitcoinInUSDAsync();
        valueOfOneBitcoinInUSD = BitcoinToUSDConvertor2.valueOfOneBitcoinInUSD;*/
        return  1/valueOfOneBitcoinInUSD*revenue;

    }

}