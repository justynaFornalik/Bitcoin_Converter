/**
 * Created by 212724387 on 13.07.2019.
 */

@isTest
global class BitcoinToUSDConvertorMock implements HttpCalloutMock {
    global HttpResponse respond(HttpRequest request){
        HttpResponse response = new HttpResponse();
        request.setHeader('Content-Type', 'application/json');
        response.setBody('[{"code":"BTC","name":"Bitcoin","rate":1},{"code":"BCH","name":"Bitcoin Cash","rate":32.726099},{"code":"USD","name":"US Dollar","rate":11386.773765}]');
        response.setStatusCode(200);
        return response;
    }


}