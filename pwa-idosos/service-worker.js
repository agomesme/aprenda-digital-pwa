// ✅ Service Worker - Aprenda Digital PWA
// Permite usar o app OFFLINE e faz cache automático

const CACHE_NAME = 'aprenda-digital-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// ==================== INSTALL ====================
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('💾 Cache aberto');
      return cache.addAll(urlsToCache).catch((err) => {
        console.log('⚠️ Alguns assets não foram cacheados (normal em PWA):', err);
        // Continuar mesmo que alguns falhem
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// ==================== ACTIVATE ====================
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker ativado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ==================== FETCH ====================
self.addEventListener('fetch', (event) => {
  // Estratégia: Tenta rede PRIMEIRO, depois cache se falhar
  if (event.request.method !== 'GET') {
    return; // Apenas GET
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se conseguiu online, salva no cache
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Se falhar (offline), tenta cache
        return caches.match(event.request).then((response) => {
          if (response) {
            console.log('📦 Usando cache:', event.request.url);
            return response;
          }

          // Se não tiver em cache, retorna página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }

          return new Response('Offline - Recurso não disponível', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// ==================== NOTIFICAÇÕES ====================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('✅ Service Worker carregado - App funciona OFFLINE!');
