/**
 * Created by 212724387 on 13.07.2019.
 */

public with sharing class BitcoinToUSDConvertor2 {
    public Decimal valueOfOneBitcoinInUSD;
    public static final String USD_CODE = 'USD';
    public String externalDataSource = 'https://bitpay.com/api/rates/';

    public BitcoinToUSDConvertor2(){
        valueOfOneBitcoinInUSD = getTheValueOfOneBitcoinInUSD(externalDataSource);
        System.debug(valueOfOneBitcoinInUSD);
    }

    @AuraEnabled(cacheable = true)
    public static Decimal getTheValueOfOneBitcoinInUSD(String externalDataSource){
        HttpResponse response = getHttpResponse(externalDataSource);
        List<Codes> codes = parseValuesFromJSONString(response);
        System.debug(setValueOfBitcoinInUSD(codes));
        return setValueOfBitcoinInUSD(codes);

    }

    private static HttpResponse getHttpResponse(String externalDataSource){
        HttpRequest request = new HttpRequest();
        request.setEndpoint(externalDataSource);
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json');
        Http http = new Http();
        return http.send(request);

    }

    private static List<Codes> parseValuesFromJSONString(HttpResponse response) {
        List<Codes> restCode;
        if (response.getStatusCode() != 200) {
            System.debug('The status code returned was not expected: '
                    + response.getStatusCode() + ' ' + response.getStatus());
        } else {
            //Parsing code values from JSON String
            //need to make a class
            //
            String responseBody = response.getBody();
            System.debug(responseBody);
            restCode = (List<Codes>) JSON.deserialize(responseBody, List<Codes>.class);
            System.debug(restCode);

        }
        return restCode;
    }

    private static Decimal setValueOfBitcoinInUSD(List<Codes> restCode){
        Decimal rate;
        for(Codes codes: restCode){
            if(codes.code == USD_CODE ){
                rate = codes.rate;
            }

        }
        return rate;

    }



}