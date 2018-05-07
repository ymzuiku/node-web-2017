package utils

import (
	"fmt"
	"os/exec"
	"runtime"
)

// RunCmd 使用系统运行
func RunCmd(str string) error {
	var commands = map[string]string{
		"windows": "cmd /c start",
		"darwin":  "open",
		"linux":   "xdg-open",
	}
	run, ok := commands[runtime.GOOS]
	if !ok {
		return fmt.Errorf("don't know how to open things on %s platform", runtime.GOOS)
	}
	cmd := exec.Command(run, str)
	return cmd.Start()
}

// OpenURL 使用系统运行
func OpenURL(str string) error {
	var commands = map[string]string{
		"windows": "cmd /c start",
		"darwin":  "open",
		"linux":   "xdg-open",
	}
	run, ok := commands[runtime.GOOS]
	if !ok {
		return fmt.Errorf("don't know how to open things on %s platform", runtime.GOOS)
	}
	cmd := exec.Command(run, str)
	return cmd.Start()
}
