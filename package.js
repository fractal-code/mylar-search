Package.describe({
    summary: "Multi-key search over encrypted data",
    name: "mylar:search",
    version: '0.1.0',
    git: "https://github.com/gliesesoftware/mylar-search.git"
});

Package.onUse(function (api) {
    api.use(['underscore', 'json', 'tracker', 'session', 'mongo', 'http',
             'mylar:timing', 'mylar:basic-crypto', 'mylar:principal'], ['client', 'server']);

    api.addFiles(['crypto_server.sh', 'crypto_server.tar.gz', 'crypto_mk.tar.gz'], 'server');

    api.addFiles(['search.js', 'crypto_server.js'], ['client', 'server']);

    api.addFiles('crypto_plugin.js', 'client');

    api.export("MylarCrypto");
    api.export("MYLAR_USE_SEARCH");
    api.export("USE_CRYPTO_SERVER");
});
