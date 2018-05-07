package log

import (
	"liuhe/app/extend/file"
	"liuhe/app/extend/utils"
	"os"
	"time"

	logging "github.com/op/go-logging"
)

// Password 密码
type Password string

// Redacted a
func (p Password) Redacted() interface{} {
	return logging.Redact(string(p))
}

// Use logging的log
var Use = logging.MustGetLogger("example")
var logFile = file.NewFileWithDay(utils.RootPath+"/logs/log", ".txt")
var format = logging.MustStringFormatter(`%{color}%{time:15:04:05.000} %{shortfunc} ▶ %{level:.4s} %{id:03x}%{color:reset} %{message}`)
var backend1 = logging.NewLogBackend(logFile, time.Now().Format("15:04:05 "), 1)
var backend2 = logging.NewLogBackend(os.Stderr, "", 0)
var backend2Formatter = logging.NewBackendFormatter(backend2, format)
var backend1Leveled = logging.AddModuleLevel(backend1)

// Init 初始化
func init() {
	backend1Leveled.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend1Leveled, backend2Formatter)
	// Use.Debugf("debug %s", Password("secret"))
	// Use.Infof("开始服务")
	// Use.Noticef("notice")
	// Use.Warningf("warning")
	// Use.Errorf("err")
	// Use.Criticalf("crit")
}

// D -
func D(format string, args ...interface{}) {
	backend1Leveled.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend1Leveled, backend2Formatter)
	Use.Debugf(format, args...)
}

// L -
func L(format string, args ...interface{}) {
	backend1Leveled.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend1Leveled, backend2Formatter)
	Use.Infof(format, args...)
}

// N -
func N(format string, args ...interface{}) {
	backend1Leveled.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend1Leveled, backend2Formatter)
	Use.Noticef(format, args...)
}

// W -
func W(format string, args ...interface{}) {
	backend1Leveled.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend1Leveled, backend2Formatter)
	Use.Warningf(format, args...)
}

// E -
func E(format string, args ...interface{}) {
	backend1Leveled.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend1Leveled, backend2Formatter)
	Use.Errorf(format, args...)
}

// C -
func C(format string, args ...interface{}) {
	backend1Leveled.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend1Leveled, backend2Formatter)
	Use.Criticalf(format, args...)
}
