package tpl

import (
	"html/template"
	"liuhe/app/extend/utils"
)

// TemplatePath 路径
var TemplatePath = utils.RootPath + "/public/template"

// Tp template实例
var Tp, _ = template.ParseGlob(TemplatePath + "/*/*")

// DevReloadTp 开发环境重新刷新页面
func DevReloadTp() {
	if utils.IsDev {
		Tp, _ = template.ParseGlob(TemplatePath + "/*/*")
	}
}
