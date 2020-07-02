var licenseKey = require('license-key-gen');

var userInfo = {company:"webisto.tec1h",street:"123 licenseKey ave", city:"city/town", state:"State/Province", zip:"postal/zip"}
var licenseData = {info:userInfo, prodCode:"LEN100120", appVersion:"1.5", osType:'IOS8'}

try{
    var license = licenseKey.createLicense(licenseData)
    console.log(license);
}catch(err){
    console.log(err);
}