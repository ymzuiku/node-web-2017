package service

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func Login(name string, password string) {
	db, err := sql.Open("mysql", "root:111Asd@tcp(127.0.0.1:3306)/CMS?charset=utf8")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer db.Close()

	addUsers, err := db.Prepare("insert users(name, age, create_time) values(?, ?, now())")
	theRes, _ := addUsers.Exec(name, password)
	theid, _ := theRes.LastInsertId()
	fmt.Println(theid)
}
