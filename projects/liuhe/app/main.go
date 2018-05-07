package main

import (
	_ "liuhe/app/controller"
	"liuhe/app/extend/doc"
	"liuhe/app/extend/log"
	"liuhe/app/extend/static"
	"liuhe/app/extend/utils"
	_ "liuhe/app/view"
	"net/http"
)

func main() {
	// 设定API Doc
	setDoc()
	// 开启静态服务器
	static.New(utils.RootPath + "/public/")
	if utils.IsDev {
		var uri = utils.GetIP() + ":7000"
		log.Use.Infof("监听: %s", uri)
		log.Use.Infof("API文档: %s/api/doc", uri)
		log.Use.Info("开启静态服务器: /opt/go/src/liuhe/public/")
		// utils.OpenURL(uri + "/api/doc")
		http.ListenAndServe(":7000", nil)
	} else {
		log.Use.Info("listen http://127.0.0.1:80")
		http.ListenAndServe(":80", nil)
	}
}

func setDoc() {
	doc.Host = "http://workos.top"
	if utils.IsDev {
		doc.Host = utils.GetIP() + ":7000"
	}
	// doc.Title = "API 实时文档"
	// doc.ReadMe = []string{
	// 	"URL的尾部部一定要带／,不然会有很多问题, 例如测试环境无法跨域",
	// 	"tip: 对接口的描述",
	// 	"data: POST方法的数据",
	// 	"request: 真实调用接口的返回值",
	// }
}
