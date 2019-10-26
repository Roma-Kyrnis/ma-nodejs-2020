function setTime(milisecond) {
    let promise = new Promise((resolved, reject) => {

        setTimeout(() => {
            resolved("resolved");
        }, milisecond);

    });

    promise.then( result => {
            console.log("Fulfilled: " + result);
        },
        error => {
            console.log("Rejected: " + error);
        }
    );
}

let mil = setTime(1000);