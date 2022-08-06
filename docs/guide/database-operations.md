# 数据库操作

以下所有数据库操作命令需要在 `mongosh` 命令下的交互模式下进行


## 查看所有数据库

```yaml
show dbs

# 或者
show databases
```

## 查看所在数据库


```yaml
db
```

> 没有切换数据库的情况下默认使用 `test` 数据库


## 切换数据库

```yaml
use DB_NAME
```

> 其中 `DB_NAME` 为待切换到的数据库库名


## 删除数据库

```yaml
db.dropDatabase()
```

MongoDB 删除数据库之前需要使用 `use DB_NAME` 切换到对应数据库，仅能删除当前所在的数据库。