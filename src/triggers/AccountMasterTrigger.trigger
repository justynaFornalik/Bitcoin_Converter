/**
 * Created by 212724387 on 07.07.2019.
 */

trigger AccountMasterTrigger on Account (after insert,after update) {
    AccountTriggerHandler accTrigHandler= new AccountTriggerHandler();

    if(Trigger.isAfter)
    {
        if(Trigger.isUpdate)
        {
                accTrigHandler.onAfterUpdate(Trigger.oldMap, Trigger.newMap);
            }

        if(Trigger.isInsert){

            accTrigHandler.onAfterInsert(Trigger.newMap);

        }
    }

}