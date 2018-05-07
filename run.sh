app="exp"
pm2="node node_modules/pm2/bin/pm2"
ccos="ccos"
today=`date +"%Y-%m-%d"`
time=`date | awk '{print $4}' | awk -F':' '{print $1}'`
if [ $1 == "s" ]
then
  clear && dev=1 node app/app.js
elif [ $1 == "d" ] 
then
  clear && dev=1 npm run nodemon app/app.js 
elif [ $1 == "mongod" ] 
then
  clear
  screen -S mongod sudo mongod
elif [ $1 == "prod" ]
then 
  pkill node && nohup node app/app.js &
elif [ $1 == "stop" ]
then 
  pkill node
elif [ $1 == "p" ]
then
  # 进入project中的命令
  output=""
  for((i=3;i<=$#;i++)); do 
      j=${!i}
      output="${output} $j "
  done
  cd projects/$2
  ${output}
elif [ $1 == "ps" ]
then
  cd projects/$2
  npm start
elif [ $1 == "pb" ]
then
  cd projects/$2
  npm run build
  rm -rf ../../static/$2
  mv build ../../static/$2
  cd ../../
  # git add .
  # git commit -m 'update'
  # git push
elif [ $1 == "siege" ]
then
  sudo siege -c 100 -r 50000 verbose http://127.0.0.1:5000/api/mongo -b 
else
  echo "情输入参数 r=运行 b=编译 bl=linux编译"
fi

