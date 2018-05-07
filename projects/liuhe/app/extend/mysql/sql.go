package mysql

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func init() {
	db, err := sql.Open("mysql", "root:111Asd@tcp(127.0.0.1:3306)/CMS?charset=utf8")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer db.Close()

	addtest, err := db.Prepare("insert test_2(name, age, create_time) values(?, ?, now())")
	theRes, _ := addtest.Exec("add2", 40)
	theid, _ := theRes.LastInsertId()
	fmt.Println(theid)
}
