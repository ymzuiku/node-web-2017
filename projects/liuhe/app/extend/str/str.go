package str

import (
	"bytes"
)

// Span a
func Span(strs []string) string {
	b := bytes.Buffer{}
	for i, l := 0, len(strs); i < l; i++ {
		b.WriteString(strs[i])
	}
	return b.String()
}
