package view

import (
	"liuhe/app/extend/tpl"
	"net/http"
)

func init() {
	http.HandleFunc("/tp/index/", func(w http.ResponseWriter, req *http.Request) {
		tpl.DevReloadTp()
		tpl.Tp.ExecuteTemplate(w, "index.html", nil)
	})
}

func init() {
	http.HandleFunc("/tp/test/", func(w http.ResponseWriter, req *http.Request) {
		tpl.DevReloadTp()
		tpl.Tp.ExecuteTemplate(w, "test.html", nil)
	})
}