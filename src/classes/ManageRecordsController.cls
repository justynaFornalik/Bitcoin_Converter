public with sharing class ManageRecordsController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getLookupSearchRecords(String searchString, String selectedSObject, Integer recordLimit) {
        if(searchString != null && searchString != ''){
            String query = 'select Name, Id from ' + selectedSObject;
            query += ' where Name like \'%'+ searchString +'%\' ';
            query+= ' limit ' + recordLimit;
            return Database.query(query);
        }
        return null;
    }

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountsList(Integer pagenumber, Integer numberOfRecords, Integer pageSize, String searchString) {
        String searchKey = '%' + searchString + '%';
        String query = 'select id, Name from Account ';
        if (searchString != null && searchString != '') {
            query += ' where name like \'%' + searchString + '%\' ';
        }
        query += ' limit ' + pageSize + ' offset ' + (pageSize * (pagenumber - 1));
        return Database.query(query);
    }
    @AuraEnabled(cacheable = true)
    public static Integer getAccountsCount(String searchString) {
        String query = 'select count() from Account ';
        if (searchString != null && searchString != '') {
            query += ' where name like \'%' + searchString + '%\' ';
        }
        return Database.countQuery(query);
    }
}