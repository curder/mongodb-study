# 增加文档

## 插入单个文档

`db.collection.insertOne()` 将单个文档插入到集合中。

以下示例将一个新文档插入到清单集合中。如果文档没有指定 `_id` 字段，MongoDB 会将带有 ObjectId 值的 `_id` 字段添加到新文档中。

```shell
db.inventory.insertOne(
   { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)
```

`insertOne()` 返回一个包含新插入文档的 `_id` 字段值的文档。

检索刚刚上面插入的文档：

```shell
db.inventory.find( { item: "canvas" } )
```

## 插入多个文档

`db.collection.insertMany()` 可以将多个文档插入到集合中。将一组文档传递给该方法。

以下示例将三个新文档插入到清单集合中。如果文档没有指定 `_id` 字段，MongoDB 会将带有 ObjectId 值的 `_id` 字段添加到每个文档中。

```shell
db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
   { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
   { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])
```

`insertMany()` 返回一个包含新插入的文档 _id 字段值的文档。

要检索插入的文档，请查询集合：

```shell
db.inventory.find( {} )
```