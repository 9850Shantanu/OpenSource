import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';


const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    }
});


axiosInstance.interceptors.request.use(
    function(config) {
     
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        // Stop global loader here
        return processResponse(response);
    },
    function(error) {
        // Stop global loader here
        return Promise.reject(processError(error));
    }
)


// if success return ->return {data:object,isSucces:true}
const processResponse=(response)=>
{
    if(response?.status===200)
    {
        
      return response;
    }
    else
    {
        return "errror"

    }

}


const processError=(error)=>
{
    if(error.response)
    {
    // request made and server responded with status other than 200
    console.log("Error in response vishwas : ",error.toJSON());


    return {
        isError:true,
        msg:API_NOTIFICATION_MESSAGES.responseFailure,
        code:error.response.status

    }

    }else if(error.request)
    {
        //request made but no response was received
        console.log("Error in request : ",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:" "
    
        }
    }
    else
    {
        //something happened in setting up request that trigger an error

        console.log("Error in Network : ",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:" "
    
        }

    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
     API[key] = (body, showUploadProgress, showDownloadProgress) =>
    {
        axiosInstance({
            method: value.method,
            url: value.url,
            data:body,
            
            responseType: value.responseType,
    
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }

    
        });


    return body;
      
    }
}

export { API };