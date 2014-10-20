Package.describe({
    summary: "Multi-key search over encrypted data",
    name: "mylar:search",
    version: '0.1.0',
    git: "https://github.com/gliesesoftware/mylar-search.git"
});

Package.onUse(function (api) {
    const USE_NACL = false;

    api.use(['underscore', 'json', 'tracker', 'session', 'mongo', 'http',
             'mylar:timing', 'mylar:basic-crypto', 'mylar:principal'], ['client', 'server']);

    api.addFiles(['crypto_server.sh', 'crypto_server.tar.gz', 'crypto_mk.tar.gz'], 'server');

    api.addFiles(['search.js', 'crypto_server.js'], ['client', 'server']);

    api.addFiles('crypto_plugin.js', 'client');

    api.export("MylarCrypto");
    api.export("MYLAR_USE_SEARCH");
    api.export("USE_CRYPTO_SERVER");
        
    if (USE_NACL) {
      // What a hack!  Extract source_root via the exception string.
      var source_root;
      var magic_string = '@@nonexistent_file@@';
      try {
        Package._require(magic_string);
      } catch (err) {
        var msg = err.message;
        var first_quote = msg.indexOf("'");
        var path_plus = msg.substr(first_quote + 1);
        source_root = path_plus.substr(0, path_plus.indexOf(magic_string));
      }

      var fs = Npm.require('fs');
      function scan_dir(d) {
        var files = fs.readdirSync(source_root + d);
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var df = d + '/' + files[i];
          var st = fs.statSync(source_root + df);
          if (st.isDirectory() && f !== 'main' && f !== 'src') {
            scan_dir(df);
          }

          if (st.isFile()) {
            api.addFiles(df, 'client');
          }
        }
      }

      if (fs.existsSync(source_root + 'crypto_ext')) {
        scan_dir('crypto_ext');
      }
    }

});
