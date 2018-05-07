#!/bin/sh

app="app/main.go"
out="public/server-go"
# echo "run: "$app
# echo "open http://localhost:8000"
# CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o dist/linux-go server/main.go
if [ $1 == "r" ]
  then  
  clear
  go run $app
elif [ $1 == "b" ]
  then
  go build -o $out $app
  echo "已编编译至 $out"  
elif [ $1 == "bl" ]
  then
  GOOS=linux GOARCH=amd64 go build -o $out $app
  echo "已使用GOOS=linux编译至 $out"
elif [ $1 == "run" ]
  then
  PROCESS=`ps -ef|grep server-go|grep -v grep|grep -v PPID|awk '{ print $2}'`
  for i in $PROCESS
  do
    echo "Kill the server-go process [ $i ]"
    kill -9 $i
  done
  
  go build -o $out $app
  echo "已编编译至 $out" 
  sleep 0.25
  nohup ./$out &
  echo "已使用nohup后台运行 $out "
elif [ $1 == "show" ]
  then
  ps -efww|grep -w 'server-go'
elif [ $1 == "stop" ]
  then
  PROCESS=`ps -ef|grep server-go|grep -v grep|grep -v PPID|awk '{ print $2}'`
  for i in $PROCESS
  do
    echo "Kill the server-go process [ $i ]"
    kill -9 $i
  done
else
  echo "情输入参数 r=运行 b=编译 bl=linux编译"
fi

