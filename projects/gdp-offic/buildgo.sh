yarn run build
mv build index
rm -rf ../../public/page/index
cp -rf ./index ../../public/page/
rm -rf index