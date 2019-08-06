/**
 * Created by 212724387 on 13.07.2019.
 */

@isTest
private class BitcoinToUSDConvertor2Test {
    @isTest static void BitcoinToUSDConvertorMock1(){
        Test.setMock(HttpCalloutMock.class, new BitcoinToUSDConvertorMock());
        Decimal result = BitcoinToUSDConvertor2.getTheValueOfOneBitcoinInUSD('https://bitpay.com/api/rates/');
        Decimal expectedResult = 11386.773765;
        System.assertEquals(result, expectedResult);

    }

}