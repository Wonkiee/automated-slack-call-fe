const URL = "http://localhost:4000/";

    module.exports.getServerStatus = () => {
        let promise = new Promise((resolve, reject) => {
            fetch(URL, {
            method: "get",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
            })
            .then(function(response) {
                return resolve(response);
            })
            .catch(error => {
                return reject(error);
            });
        });
        return promise;
    };

    module.exports.setServerStatus = (status) => {
        let reqBody = {};
        if(status) {
            reqBody.startService = true;
        } else {
            reqBody.stopService = true;
        }
        fetch(URL, {
          method: "post",
          body: JSON.stringify(reqBody),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            return error;
        });
      };

    module.exports.getActiveNumbers = () => {console.log('called')
        let promise = new Promise((resolve, reject) => {
            fetch(URL+'active-numbers/', {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then(response => response.json())
            .then(function(response) {
                return resolve(JSON.stringify(response));
            })
            .catch(function(error) {
                return reject(error);
            });
        });
        return promise;
    };

    module.exports.handleCallingOperation = (phoneNumber, enableStatus) => {
        let reqBody = {
            phoneNumber: phoneNumber,
        };
        if(enableStatus) {
            reqBody.startService = true;
        } else {
            reqBody.stopService = true;
        }

        fetch(URL+'active-numbers/', {
            method: "post",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            return error;
        });
    };

    module.exports.phoneNumberActiveStates = () => {
        return new Promise((resolve, reject) => {
            fetch(URL+'active-numbers-status/', {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(response => response.json())
            .then(function(response) {
                return resolve(response);
            })
            .catch(function(error) {
                return reject(error);
            });
        });
    };
