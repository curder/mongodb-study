# 更新文档

为了配合下面更新文档方法的测试，创建或填充 inventory 集合，运行以下命令：

```shell
db.inventory.insertMany( [
   { item: "canvas", qty: 100, size: { h: 28, w: 35.5, uom: "cm" }, status: "A" },
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "mat", qty: 85, size: { h: 27.9, w: 35.5, uom: "cm" }, status: "A" },
   { item: "mousepad", qty: 25, size: { h: 19, w: 22.85, uom: "cm" }, status: "P" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
] );
```

## 更新集合中的文档

MongoDB 提供了更新操作符，例如 `$set` 来修改字段值。

要使用更新运算符，请将以下形式的更新文档传递给更新方法：

```shell
{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
}
```

> 如果字段不存在，更新运算符 `$set` 将创建该字段。


### 更新单个文档

以下示例使用 `inventory` 集合上的 `db.collection.updateOne()` 方法来更新 `item` 等于 `paper` 的第一个文档：

```shell
db.inventory.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
)
```

::: details MongoDB shell 运行结果
```json
[
  {
    _id: ObjectId("62f22beeab3dc4ee4b51f672"),
    item: 'paper',
    qty: 100,
    size: { h: 8.5, w: 11, uom: 'cm' },
    status: 'P',
    lastModified: ISODate("2022-08-09T09:43:47.350Z")
  }
]
```
:::

- 使用 `$set` 运算符将 `size.uom` 字段的值更新为 `cm`，将 `status` 字段的值更新为 `P`。

- 使用 `$currentDate` 运算符将 `lastModified` 字段的值更新为当前日期。如果 `lastModified` 字段不存在，`$currentDate` 将创建该字段。


### 更新多个文档

以下示例使用 `inventory` 集合上的 `db.collection.updateMany()` 方法来更新 `qty` 小于 `50` 的所有满足条件的文档：

```shell
db.inventory.updateMany(
   { "qty": { $lt: 50 } },
   {
     $set: { "size.uom": "in", status: "P" },
     $currentDate: { lastModified: true }
   }
)
```

::: details MongoDB shell 运行结果
```json
[
  {
    _id: ObjectId("62f22beeab3dc4ee4b51f66e"),
    item: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'in' },
    status: 'P',
    lastModified: ISODate("2022-08-09T09:45:16.848Z")
  },
  {
    _id: ObjectId("62f22beeab3dc4ee4b51f670"),
    item: 'mousepad',
    qty: 25,
    size: { h: 19, w: 22.85, uom: 'in' },
    status: 'P',
    lastModified: ISODate("2022-08-09T09:45:16.848Z")
  },
  {
    _id: ObjectId("62f22beeab3dc4ee4b51f674"),
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'in' },
    status: 'P',
    lastModified: ISODate("2022-08-09T09:45:16.848Z")
  }
]
```
:::

- 使用 `$set` 运算符将 `size.uom` 字段的值更新为 `in`，将 `status` 字段的值更新为 `P`
- 使用 `$currentDate` 运算符将 `lastModified` 字段的值更新为当前日期。如果 `lastModified` 字段不存在，`$currentDate` 将创建该字段。


### 替换更新单个文档

以下示例使用 `inventory` 集合上的 `db.collection.replaceOne()` 方法来替换 `item` 为 `paper` 的所有满足条件的文档：

```shell
db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)
```

::: details MongoDB shell 运行结果
```json
[
  {
    _id: ObjectId("62f22beeab3dc4ee4b51f672"),
    item: 'paper',
    instock: [ { warehouse: 'A', qty: 60 }, { warehouse: 'B', qty: 40 } ]
  }
]
```
:::

- 原文档中的其他除 `_id` 字段外均被替换。