# r m test/unit/*.js 运行所有js
if [ $1 == "m" ]
then 
  node node_modules/mocha/bin/mocha --reporter mochawesome $2 $3 $4
  open mochawesome-report/mochawesome.html
elif [ $1 == "mapi" ]
then
  node node_modules/mocha/bin/mocha --compilers js:babel-core/register --reporter mochawesome src/service/api.test.js
  open mochawesome-report/mochawesome.html
fi