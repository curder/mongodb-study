# 查询操作

此页面上的示例使用 `inventory` 集合。使用下面的命令完成数据的填充准备，方便后续查询使用：

```shell
db.inventory.insertMany([
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);
```

## 选择集合中的所有文档

要选择集合中的所有文档，请将一个空文档作为查询过滤器参数传递给 `find` 方法。查询过滤器参数确定选择条件：

```shell
db.inventory.find( {} )
```

该操作对应传统型数据库的如下 SQL 语句:

```sql
SELECT * FROM inventory;
```

## 指定相等条件

要指定相等条件，请在查询过滤器文档中使用 `<field>`: `<value>` 表达式：

```shell
{ <field1>: <value1>, ... }
```

以下示例从 `inventory` 集合中选择 `status` 等于 `"D"` 的所有文档：

```shell
db.inventory.find( { status: "D" } )
```

该操作对应传统型数据库的如下 SQL 语句:

```sql
SELECT * FROM inventory WHERE status = "D";
```

## 使用查询运算符指定条件

查询过滤器文档可以使用查询运算符以下列形式指定条件：

```shell
{ <field1>: { <operator1>: <value1> }, ... }
```

以下示例从 `inventory` 集合中检索 `status` 等于 `"A"` 或 `"D"` 的所有文档：

```shell
db.inventory.find( { status: { $in: [ "A", "D" ] } } )
```

该操作对应传统型数据库的如下 SQL 语句:

```sql
SELECT * FROM inventory WHERE status in ("A", "D");
```

## 指定 AND 条件

复合查询可以为集合文档中的多个字段指定条件。隐式的逻辑 `AND` 连接连接复合查询的子句，以便查询选择集合中匹配所有条件的文档。

以下示例检索 `inventory` 集合中 `status` 等于 `"A"` 且 `qty` 小于 (`$lt`) `30` 的所有文档：

```shell
db.inventory.find( { status: "A", qty: { $lt: 30 } } )
```

该操作对应传统型数据库的如下 SQL 语句:
```sql
SELECT * FROM inventory WHERE status = "A" AND qty < 30;
```

## 指定 OR 条件

使用 `$or` 运算符，可以指定一个复合查询，该查询使用逻辑 `OR` 连接来连接每个子句，以便查询选择集合中至少匹配一个条件的文档。

以下示例检索集合中 `status` 等于 `"A"` 或 `qty` 小于 (`$lt`) `30` 的所有文档：

```shell
db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
```

该操作对应传统型数据库的如下 SQL 语句:

```sql
SELECT * FROM inventory WHERE status = "A" OR qty < 30;
```

## 指定 AND 以及 OR 条件

在以下示例中，复合查询文档选择集合中 `status` 等于 `"A"` 且 `qty` 小于 (`$lt`) `30` 或 `item` 以字符 `p` 开头的所有文档：

```shell
db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
} )
```

该操作对应传统型数据库的如下 SQL 语句:

```sql
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%");
```


更多查询操作可以[查看官方文档](https://www.mongodb.com/docs/manual/tutorial/query-documents/)。