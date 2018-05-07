package doc

import (
	"html/template"
	"liuhe/app/extend/utils"
	"liuhe/app/extend/www"
	"net/http"
)

// Item -
type Item struct {
	URL  string
	Data string
	Tip  string
}

var items = []Item{}

// Title 设置Title
var Title = `Tiny Auto API Document`

// ReadMe 设置Doc的ReadMe
var ReadMe = []string{
	"How use?",
	`Set default host: doc.Host = "http://127.0.0.1:8080"`,
	`Set document title: doc.Title = "New Doc Title"`,
	`Set document readme: doc.ReadMe = []string{"Read 1", "Read 2"}`,
	`Set document URL: doc.Add(doc.Item{URL:"/api/name", data:{"name":"dog", age:30}})`,
}

// Host 默认 http://127.0.0.1:7000
var Host = "http://127.0.0.1:7000"

// Add -
func Add(item Item) {
	items = append(items, item)
}

func init() {
	http.HandleFunc("/api/doc/", func(w http.ResponseWriter, req *http.Request) {
		www.MaxAge(w, "0")
		var data = struct {
			DocTitle string
			DocHost  string
			Items    []Item
			Reads    []string
		}{
			DocTitle: Title,
			DocHost:  Host,
			Items:    items,
			Reads:    ReadMe,
		}
		t, _ := template.ParseGlob(utils.RootPath + "/app/extend/doc/*.html")
		t.ExecuteTemplate(w, "doc.html", data)
	})
}

// TestNum 页面接口测试
func TestNum(num int, item Item) {
	for i, l := 0, num; i < l; i++ {
		Add(item)
	}
}
