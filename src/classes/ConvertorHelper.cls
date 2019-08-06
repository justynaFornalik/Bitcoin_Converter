/**
 * Created by 212724387 on 15.07.2019.
 */

public with sharing class ConvertorHelper {
    @Future(Callout = true)
    public static void getTheValueOfOneBitcoinInUSDAsync(){
        /*String externalDataSource = 'https://bitpay.com/api/rates/';
        Decimal result = BitcoinToUSDConvertor2.getTheValueOfOneBitcoinInUSD(externalDataSource);
        System.debug(result);*/

        BitcoinToUSDConvertor2 convertor2 = new BitcoinToUSDConvertor2();
    }

}