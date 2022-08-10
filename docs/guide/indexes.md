# 索引

索引支持在 MongoDB 中高效执行查询。如果没有索引，MongoDB 必须执行集合扫描，即扫描集合中的每个文档，以选择与查询语句匹配的文档。

如果查询存在适当的索引，MongoDB 可以使用该索引来限制它必须检查的文档数量。

## 为什么mongdb需要创建索引

- 加快查询速度

- 进行数据的去重

## 创建简单的索引方法

语法：`db.集合名.ensureIndex({属性:1})` ，`1` 表示升序，`-1` 表示降序


## 创建索引前后查询速度对比

创建一百万条测试数据：
```shell
for(i=0; i < 1_000_000; i++){ db.tests.insert({ name:'test' + i, age: i}) }
```

```shell
db.t1.find({name:'test1000000'})
db.t1.find({name:'test1000000'}).explain('executionStats') # 显示查询操作的详细信息
```
