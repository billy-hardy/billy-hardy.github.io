let persistWorker = new Worker("persist.js");

function saveVal() {
    let input = document.getElementById("temp");

    let val = input.value;
    persistWorker.postMessage({cmd: "create", value: val});
}

function getHistory() {
    let display = document.getElementById("display");
    persistWorker.postMessage({cmd: "retrieve"});
}

persistWorker.addEventListener('message', function ({data}) {
    if(data.cmd == "create") {
        console.log("value saved");
    } else if(data.cmd == "retrieve") {
        let display = document.getElementById("display");
        if(data.value == null) {
            display.innerHTML = data.keys;
        } else {
            display.innerHTML = data.value;
        }
    }
});
