/**
 * Created by 212724387 on 08.07.2019.
 */

public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsList() {
        return [SELECT Id, Name FROM Account];
    }

}