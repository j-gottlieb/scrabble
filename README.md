# Scrabble

## Local DB Setup

### Install MySQL
At this time of writing, Homebrew has MySQL version **5.7.15** as default formulae in its main repository :

* Enter the following command : `$ brew info mysql`  
* Expected output: **mysql: stable 5.7.15 (bottled)**

To install MySQL enter : `$ brew install mysql`

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

### Creating local database fixtures
If you are creating a new database table, create a js file in database/table_definitions that has the same name as the table. In this file create 2 variables, one called `createTableStatement` and optionally another called `insertStatement`.

The `createTableStatement` should be a create table sql statement that begins with `CREATE TABLE IF NOT EXISTS` to avoid errors if the table already exists in your local mysql instance.

The `insertStatement` should a simple insert statement that uses `IGNORE` syntax so that no errors are thrown on primary key violations.
example: `INSERT IGNORE INTO wordFrequency VALUES (...values)`

On server start, all of the tables will be created and populated with the data in each `insertStatement`.

### Development Environmental Variables
Create a file call `.env` and add all local development secrets to it.
**Important** Add this file to .gitignore so that it is not committed to source control. 

Make use of the `getEnvVar` function in env_helpers.js to retrieve those variables in the code.

