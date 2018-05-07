package controller

import (
	"fmt"
	"liuhe/app/extend/doc"
	"liuhe/app/extend/www"
	"net/http"
)

func init() {
	doc.Add(doc.Item{
		URL: "/api/api/",
	})
	http.HandleFunc("/api/api/", func(w http.ResponseWriter, req *http.Request) {
		www.Header(w)
		www.HeaderDev(w)
		req.ParseForm()
		fmt.Fprintf(w, `{"status":%d,"name":"api","age":18, }`, 200)
	})
}
