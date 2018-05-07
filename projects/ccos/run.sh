app=ccos
if [ $1 == "go" ]
then
yarn run build
rm -rf ../../public/$app
mv build ../../public/$app
cd ../../
git add .
git commit -m 'update'
git push
elif [ $1 == "s" ]
then
npm run start
elif [ $1  == "b" ]
then
npm run build
cp -rf build/* linux/
else 
echo "没有输入命令"
fi