# 查询选择器

## 比较运算符

比较运算符根据值比较返回数据。

| 运算符 | 描述 | 示例 |
| --- | --- | ---- |
| `$eq` | 匹配等于指定值的值。 | `db.inventory.find( { status: { $eq: 'D' } } )` |
| `$gt` | 匹配大于指定值的值。 | `db.inventory.find( { qty: { $gt: 75 } } )` |
| `$gte` | 匹配大于或等于指定值的值。 | `db.inventory.find( { qty: { $gte: 75 } } )` |
| `$in` | 匹配数组中指定的任何值。 | `db.inventory.find( { status: { $in: ["A", "D"] } } )` |
| `$lt` | 匹配小于指定值的值。 | `db.inventory.find( { qty: { $lt: 75 } } )` |
| `$lte` | 匹配小于或等于指定值的值。 | `db.inventory.find( { qty: { $lte: 75 } } )` |
| `$ne` | 匹配所有不等于指定值的值。 | `db.inventory.find( { qty: { $ne: 75 } } )` |
| `$nin` | 不匹配数组中指定的任何值。 | `db.inventory.find( { status: { $nin: ['A'] } } )` |


## 逻辑运算符

逻辑运算符根据计算结果为真或假的表达式返回数据。

| 运算符 | 描述 | 
| --- | --- | 
| `$and` | 使用逻辑 `AND` 连接查询子句，返回与这两个子句的条件匹配的所有文档。 |
| `$not` | 反转查询表达式的效果并返回与查询表达式不匹配的文档。 |
| `$nor` | 使用逻辑 `NOR` 连接查询子句会返回所有无法匹配两个子句的文档。 |
| `$or` | 使用逻辑 `OR` 连接查询子句会返回与任一子句的条件匹配的所有文档。 |


更多操作[可以查看官方文档](https://www.mongodb.com/docs/manual/reference/operator/)