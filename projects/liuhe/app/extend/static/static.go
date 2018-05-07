package static

import (
	"net/http"

	"github.com/NYTimes/gziphandler"
)

// New 开启静态服务器
func New(path string) {
	// public := gziphandler.GzipHandler(http.FileServer(http.Dir(path)))
	public := gziphandler.GzipHandler(http.StripPrefix("/", http.FileServer(http.Dir(path))))
	http.Handle("/", public)
}
