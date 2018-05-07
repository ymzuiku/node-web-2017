package file

import (
	"fmt"
	"os"
	"time"
)

// Import 用于Import
func Import() {}

// NewFile 创建一个有权限的文件
func NewFile(path string, dot string) *os.File {
	file, err := os.OpenFile(path+dot, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666)
	if err != nil {
		fmt.Println("文件创建失败")
		fmt.Println(err)
	}
	return file
}

// NewFileWithDay 创建一个有权限的文件,已当天为后缀
func NewFileWithDay(path string, dot string) *os.File {
	timeStr := time.Now().Format("-2006-01-02")
	file, err := os.OpenFile(path+timeStr+dot, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666)
	if err != nil {
		fmt.Println("文件创建失败")
		fmt.Println(err)
	}
	return file
}
