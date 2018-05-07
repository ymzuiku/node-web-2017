package www

import (
	"liuhe/app/extend/utils"
	"net/http"
)

// Header 设置基本header
func Header(w http.ResponseWriter) {
	w.Header().Add("Access-Control-Allow-Methods", "POST, GET, PUT")
	w.Header().Add("Access-Control-Allow-Headers", "x-requested-with,content-type")
	w.Header().Add("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Content-Type", "application/json")
}

// AllowOrigin 设置跨域ip
func AllowOrigin(w http.ResponseWriter, ip string) {
	w.Header().Set("Access-Control-Allow-Origin", ip)
}

// MaxAge 设置缓存时间，单位秒
func MaxAge(w http.ResponseWriter, age string) {
	w.Header().Set("Access-Control-Max-Age", age)
}

// HeaderDev 只在开发模式 设置跨域 *; 并且把maxAge设置为0秒
func HeaderDev(w http.ResponseWriter) {
	if utils.IsDev {
		w.Header().Set("Access-Control-Allow-Origin", "*") //允许访问所有域
		w.Header().Set("Access-Control-Max-Age", "0")
	}
}
