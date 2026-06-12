const CACHE_NAME = 'hogwarts-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// 설치 및 파일 캐싱
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// 네트워크 연결이 끊겨도 캐시된 파일로 실행
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});