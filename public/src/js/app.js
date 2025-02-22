if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js', {scope: '/'})
        .then(() => {
            console.log('Service worker successfully registered!');
        });
}

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done!!!!')
    }, 3000);
})

promise.then((text) => {
    console.log(text);
});