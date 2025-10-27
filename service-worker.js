const CACHE_NAME = 'fin-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Adicione aqui outros arquivos CSS ou JS se você os tiver
  '/icon-192.png',
  '/icon-512.png'
];

// Instala o service worker e armazena os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e serve do cache primeiro
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna
        if (response) {
          return response;
        }
        // Senão, busca na rede
        return fetch(event.request);
      }
    )
  );
});