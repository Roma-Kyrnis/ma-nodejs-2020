class Storage {
    keys = [ {key: "true", data: "false"}, {key: "true1", data: "false1"}];

    storeList([{key, data}]) {
        let promise = new Promise( (resolve, reject) => {
            this.keys[0] = {key, data};
            resolve("resolved");
        })
        promise
        .then(
            result => console.log(result),           
        )
    };

    destroyStartedWith(beginningOfKey) {

        console.log(this.keys);

        let promise = new Promise( (resolve, reject) => {
            delete this.keys[{beginningOfKey}];
            console.log(this.keys);

            resolve("resolved");
        })
        promise
            .then(
                result => {
                    console.log(result);
                },
            )
    }

    fetchInTimeOrFail(key, timeout) {
        let promise = new Promise ( (resolve, reject) => {
            setTimeout(() => {
                    //this.list(key);
                resolve("resolved");
            }, timeout);
            reject(new Error("Error"));
        })
        promise
            .then(
                result => {
                    console.log(result);
                },
                error => {
                    console.log(error);
                }
            )
    }
}

let str = new Storage;
str.storeList([{key: 'true3', data: 'false3'}]);
str.destroyStartedWith("true1");
