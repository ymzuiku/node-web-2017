package utils

import (
	"net"
	"runtime"
	"strings"
)

var _isdev = checkDev()

// RootPath 项目根路径
var RootPath = "/opt/go/src/liuhe"

func checkDev() bool {
	var isDev = false
	if runtime.GOOS == "darwin" {
		isDev = true
	}
	return isDev
}

// IsDev 是否在开发环境
var IsDev = _isdev

// GetIP 获取本机IP
func GetIP() string {
	info, _ := net.InterfaceAddrs()
	var end = "http://"
	for _, addr := range info {
		var str = strings.Split(addr.String(), "/")[0]
		var nums = strings.Split(str, ".")
		if len(nums) == 4 && nums[0] != "127" {
			end += str
		}
	}
	return end
}
