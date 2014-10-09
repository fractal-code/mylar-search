if [ ! -d crypto_mk ]; then
  tar -zxf crypto_mk.tar.gz
fi

if [ ! -d crypto_server ]; then
  tar -zxf crypto_server.tar.gz
fi

if pidof crypto_server; then
    echo "Crypto server already running"
else
	for D in crypto_mk crypto_server; do
      echo "Building $D"
      ( cd $D && make )
    done
    (cd crypto_server && ./crypto_server &)
fi