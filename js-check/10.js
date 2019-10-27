class Storage {
    keys = [];

    list() {
        return new Promise( (resolve, reject) => {
            resolve("resolved");
        })
    }

    fetch(key)

    store(key, data) {
        this.keys.key = key;
        this.keys.data = data;
    }

    storeList([{key,data}]) {
        return Promise( (resolve, reject) => {
            console.log(this.keys[key]);
            resolve("resolved");
        })
    }

    destroyStartedWith (beginningOfKey)

    fetchInTimeOrFail(key, timeout) {

        Promise( (resolve, reject) => {
        resolve("resolved");
        })
    }
}