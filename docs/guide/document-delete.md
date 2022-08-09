# 删除文档

使用 `inventory` 集合。要填充 `inventory` 集合，请运行以下命令：

```shell
db.inventory.insertMany( [
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
] );
```

## 删除一个文档

要删除最多与指定过滤器匹配的单个文档（即使多个文档可能与指定过滤器匹配），使用 `db.collection.deleteOne()` 方法。

以下示例删除 `status` 为 `D` 的第一个文档：

```shell
db.inventory.deleteOne( { status: "D" } )
```

::: details MongoDB shell 执行结果
```json
[
  {
    _id: ObjectId("62f23072ab3dc4ee4b51f677"),
    item: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A'
  },
  {
    _id: ObjectId("62f23072ab3dc4ee4b51f678"),
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'P'
  },
  {
    _id: ObjectId("62f23072ab3dc4ee4b51f67a"),
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D'
  },
  {
    _id: ObjectId("62f23072ab3dc4ee4b51f67b"),
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A'
  }
]
```
:::


## 删除多个文档

可以指定用于识别要删除的文档的条件或过滤器。过滤器使用与读取操作相同的语法。

要指定相等条件，请在查询过滤器文档中使用 `<field>:<value>` 表达式：

```shell
{ <field1>: <value1>, ... }
```

查询过滤器文档可以使用查询运算符以下列形式指定条件：

```shell
{ <field1>: { <operator1>: <value1> }, ... }
```

要删除所有符合删除条件的文档，请将过滤器参数传递给 `db.collection.deleteMany()` 方法。

以下示例从库存集合中删除状态字段等于“A”的所有文档：

```shell
db.inventory.deleteMany({ status : "A" })
```

::: details MongoDB shell 执行结果
```json
[
  {
    _id: ObjectId("62f23072ab3dc4ee4b51f678"),
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'P'
  },
  {
    _id: ObjectId("62f23072ab3dc4ee4b51f67a"),
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D'
  }
]
```
:::


## 删除所有文档

要从集合中删除所有文档，请将空过滤器文档 `{}` 传递给 `db.collection.deleteMany()` 方法。


以下示例从集合中删除所有文档：

```shell
db.inventory.deleteMany({})
```

该方法返回一个包含操作状态的文档。