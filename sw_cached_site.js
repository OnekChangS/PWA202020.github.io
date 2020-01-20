const cacheName = 'Version dos';
    
//activar el llamado Event
self.addEventListener( 'install', e => {
    console.log('Service Worker: Installed');
});

self.addEventListener( 'activate', e => {
    console.log('Service Worker: Activated');
    // borrar cache no deseado
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map( cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Borrar cache viejo');
                        return caches.delete(cache);
                    }
                })
            );
        })          //verificar si es cacheName o cacheNames
    );
});


// llamar al fetch event

self.addEventListener('fetch', e => {
    console.log('Service Worker : esta fecthing');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            //abrir el cache

            caches
            .open(cacheName)
            .then( cache => {
                cache.put(e.requesrt, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request) .then(res => res))
    );
});