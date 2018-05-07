package controller

import (
	"fmt"
	"liuhe/app/extend/doc"
	"liuhe/app/extend/log"
	"liuhe/app/extend/www"
	"net/http"
)

func init() {
	doc.Add(doc.Item{
		URL:  "/api/login/",
		Tip:  `登录`,
		Data: `?&name=ym&password=50`,
	})
	http.HandleFunc("/api/login/", func(w http.ResponseWriter, req *http.Request) {
		www.Header(w)
		www.HeaderDev(w)
		req.ParseForm()

		name := req.FormValue("name")
		password := req.FormValue("password")

		if name != "" && password != "" {
			// service.Login(name, password)
			fmt.Fprintf(w,
				`{"status":200, "name":"%s", "token":"%s"}`,
				name, "testtoken")
		} else {
			log.Use.Error(`{"status":201, "msg":"用户名或账号错误"}`)
			fmt.Fprintf(w, `{"status":201, "msg":"用户名或账号错误"}`)
		}
	})
}
