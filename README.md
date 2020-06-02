# Scrabble

## Local DB Setup

### Install MySQL
At this time of writing, Homebrew has MySQL version **5.7.15** as default formulae in its main repository :

* Enter the following command : `$ brew info mysql`  
* Expected output: **mysql: stable 5.7.15 (bottled)**

To install MySQL enter : `$ brew install mysql`

## Additional configuration
### Homebrew

* Install **brew services** first : `$ brew tap homebrew/services`
* Load and start the MySQL service : `$ brew services start mysql`.   
Expected output : **Successfully started `mysql` (label: homebrew.mxcl.mysql)** 	  

* Check of the MySQL service has been loaded : `$ brew services list` <sup>[1](#1)</sup>

* Verify the installed MySQL instance : `$ mysql -V`.   
Expected output : **Ver 14.14 Distrib 5.7.15, for osx10.12 (x86_64)**  


### MySQL
Open Terminal and execute the following command to set the root password:  
 `mysqladmin -u root password 'yourpassword'`  

> **Important** : Use the single ‘quotes’ to surround the password and make sure to select a strong password!

### Install MySQL Workbench (SQL IDE)
https://www.mysql.com/products/workbench/
