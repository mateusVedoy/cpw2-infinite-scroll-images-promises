window.addEventListener('load', () => {
    resolveRequestPromise(XMLHttpRequestGetData, imageCreate);
});

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        resolveRequestPromise(XMLHttpRequestGetData, imageCreate);
    }
});

function resolveRequestPromise(promiseFunc, callbackFunc) {
    promiseFunc().then((response) => {
        for (let i = 0; i < 15; i++) {
            callbackFunc(JSON.parse(response)[getRamdomIndex(15)].url)
        }
    });
}

function XMLHttpRequestGetData() {
    let xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('GET', './data.json', true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(Error('Image não carregada. Código do erro:' + xhr.statusText));
            };
        };
        xhr.onerror = () => {
            reject(Error('Há um erro de rede.'));
        };
        xhr.send();
    });

}

function imageCreate(url) {
    let img = document.createElement('img');
    img.setAttribute('src', `${url}`);
    img.setAttribute('class', 'randomImgs');
    document.getElementsByTagName('body')[0].appendChild(img);
}

function getRamdomIndex(max) {
    return Math.floor(Math.random() * (max - 0)) + 0;
}