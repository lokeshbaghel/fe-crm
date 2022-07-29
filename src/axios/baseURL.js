let api_server = '127.0.0.1';
let localApiUrl = 'http://127.0.0.1:8070/api/v1/';
let devApiUrl = 'https://crm-be-dev.8bitsolutions.net/api/v1/';
let qaApiUrl ='https://crm-be-qa.8bitsolutions.net/api/v1/';
let uatApiUrl ='https://api.uat.ofgconnect.co.uk/api/v1/';
let liveApiUrl = 'https://api.ofgconnect.co.uk/api/v1/';
  
switch (window.location.origin) {
    default:
    case 'http://127.0.0.1:3000': // local
        api_server = localApiUrl;
        break
    
    case 'https://crm-fe-dev.8bitsolutions.net':
        api_server = devApiUrl;
        break
    
    case 'https://crm-fe-qa.8bitsolutions.net':
        api_server = qaApiUrl;
        break
    
    case 'https://uat.ofgconnect.co.uk':
        api_server = uatApiUrl;
        break
    
    case 'https://www.ofgconnect.co.uk':
        api_server = liveApiUrl;
        break
}

 export default api_server;