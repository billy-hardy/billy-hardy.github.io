importScripts('/node_modules/idb-keyval/idb-keyval.js');

self.addEventListener("message", async function({data}) {
    let cmd = data.cmd;
    if(cmd == "create") {
        let success = await saveVal(data.value);
        self.postMessage({cmd});
    } else if(cmd == "retrieve") {
        let valToGet = data.value
        if(valToGet == null) {
            let keys = await getKeys();
            self.postMessage({cmd, keys});
        } else {
            let value = await getVal(data.value);
            self.postMessage({cmd, value});
        }
    }
});

function saveVal(value) {
    function getUUID() {
        function r4() {
            function rand() {
                return Math.floor(Math.random()*10)+'';
            }
            return rand()+rand()+rand()+rand();
        }
        return r4()+r4()+r4()+r4();
    }
    return idbKeyval.set(getUUID(), value);
}

function getKeys() {
    return idbKeyval.keys();
}

function getVal(key) {
    return idbKeyval.get(key);
}
