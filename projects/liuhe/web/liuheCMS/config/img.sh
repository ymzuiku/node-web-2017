#!/bin/sh

app="gka"
# echo "run: "$app
# echo "open http://localhost:8000"
# CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o dist/linux-go server/main.go
# bash img.sh public/ icon
# ${!#} 最后一个参数


echo like: $ bash img.sh public/ icon pic
for i in $@
do
  if [ $i != $1 ]
      then
      if [ -n "$i" ]
        then
        gka $1$i -m
        cp -r $1gka-$i-u-normal/img/* $1$i
        rm -r $1gka-$i-u-normal
      fi
    fi
done
