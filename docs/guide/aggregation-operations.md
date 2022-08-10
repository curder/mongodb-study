# 聚合操作

聚合操作处理多个文档并返回计算结果。使用聚合操作来：

- 将多个文档中的值组合在一起
- 对分组数据执行操作以返回单个结果
- 分析数据随时间的变化

## 单一目的聚合方法

单一目的聚合方法聚合来自单个集合的文档。这些方法使用时很简单，但缺乏聚合管道的功能。

| 方法 | 描述 | 
| ---- | ---- |
| `db.collection.estimatedDocumentCount()` | 返回集合或视图中文档的近似计数。[详情文档](https://www.mongodb.com/docs/manual/reference/method/db.collection.estimatedDocumentCount/#mongodb-method-db.collection.estimatedDocumentCount) |
| `db.collection.count()` | 返回集合或视图中文档数的计数。 [详情文档](https://www.mongodb.com/docs/manual/reference/method/db.collection.count/#mongodb-method-db.collection.count) | 
| `db.collection.distinct()` | 返回具有指定字段的不同值的文档数组。[详情文档](https://www.mongodb.com/docs/manual/reference/method/db.collection.distinct/#mongodb-method-db.collection.distinct) |


## 聚合管道

操作语法：`db.集合名称.aggregate({管道:{表达式}})`

聚合管道由一个或多个处理文档的[阶段组成](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#std-label-aggregation-pipeline-operator-reference)：

- 每个阶段对输入文档执行一个操作。例如，一个阶段可以过滤文档、分组文档和计算值。
- 从一个阶段输出的文档被传递到下一个阶段。
- 聚合管道可以返回文档组的结果。例如，返回总值、平均值、最大值和最小值。


以下用于测试聚合管道的示例数据：
```shell
db.orders.insertMany( [
   { _id: 0, name: "Pepperoni", size: "small", price: 19,
     quantity: 10, date: ISODate( "2021-03-13T08:14:30Z" ) },
   { _id: 1, name: "Pepperoni", size: "medium", price: 20,
     quantity: 20, date : ISODate( "2021-03-13T09:13:24Z" ) },
   { _id: 2, name: "Pepperoni", size: "large", price: 21,
     quantity: 30, date : ISODate( "2021-03-17T09:22:12Z" ) },
   { _id: 3, name: "Cheese", size: "small", price: 12,
     quantity: 15, date : ISODate( "2021-03-13T11:21:39.736Z" ) },
   { _id: 4, name: "Cheese", size: "medium", price: 13,
     quantity:50, date : ISODate( "2022-01-12T21:23:13.331Z" ) },
   { _id: 5, name: "Cheese", size: "large", price: 14,
     quantity: 10, date : ISODate( "2022-01-12T05:08:13Z" ) },
   { _id: 6, name: "Vegan", size: "small", price: 17,
     quantity: 10, date : ISODate( "2021-01-13T05:08:13Z" ) },
   { _id: 7, name: "Vegan", size: "medium", price: 18,
     quantity: 10, date : ISODate( "2021-01-13T05:10:13Z" ) }
] )
```

### 计算总订单数量

- 返回按 pizzas 名称分组的 pizza 的总订单数量：

    ```shell
    db.orders.aggregate( [
    // 阶段1: 按 pizza 大小过滤 pizza 订单文档
    {
        $match: { size: "medium" }
    },
    // 阶段2: 按 pizza 名称对剩余文档进行分组并计算总量
    {
        $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
    }
    ] )
    ```

    `$match` 阶段：

    - 将 pizzas 订单文档过滤为具有 `size` 的 pizza `medium`。
    - 将剩余的文档传递到 `$group` 阶段。

    `$group` 阶段：

    - 按 name 对剩余文档进行分组。
    - 使用 `$sum` 计算每个披萨名称的总订单数量。总计存储在聚合管道返回的 `totalQuantity` 字段中。


    ::: details MongoDB shell 运行结果
    ```json
    [
    { _id: 'Pepperoni', totalQuantity: 20 },
    { _id: 'Cheese', totalQuantity: 50 },
    { _id: 'Vegan', totalQuantity: 10 }
    ]
    ```
    :::

- 按 pizza 大小对文档进行分组并计算总量
    ```shell
    db.orders.aggregate( {
        // 按 pizza 大小对文档进行分组并计算总量
        $group: { _id: "$size", totalQuantity: { $sum: "$quantity" } }
    } )
    ```
    ::: details MongoDB shell 运行结果
    ```json
    [
    { _id: 'medium', totalQuantity: 80 },
    { _id: 'small', totalQuantity: 35 },
    { _id: 'large', totalQuantity: 40 }
    ]
    ```
    :::

### 计算总订单价值和平均订单数量


以下示例计算两个日期之间的总订单价值和平均订单数量：

```shell
db.orders.aggregate( [
   // 阶段1: 按日期范围过滤订单文件
   {
      $match:
      {
         "date": { $gte: new ISODate( "2020-01-30" ), $lt: new ISODate( "2022-01-30" ) }
      }
   },
   // 阶段2: 按日期对剩余文档进行分组并计算结果
   {
      $group:
      {
         _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
         totalOrderValue: { $sum: { $multiply: [ "$price", "$quantity" ] } },
         averageOrderQuantity: { $avg: "$quantity" }
      }
   },
   // 阶段3: 按 totalOrderValue 降序排列文档
   {
      $sort: { totalOrderValue: -1 }
   }
 ] )
```

`$match` 阶段：

- 将披萨订单文档过滤指定的日期范围内的文档。
- 将剩余的文件传递到 `$group` 舞台。


`$group` 阶段：

- 使用将文档按日期分组 `$dateToString`。
- 对于每个组，计算：
  - `$sum` 使用和的总订单价值 `$multiply`。
  - 平均订货量使用 `$avg`.
- 将分组的文档传递到 `$sort` 舞台。


`$sort` 阶段：

- 按每个组的总订单值以降序 (`-1`) 对文档进行排序。
- 返回排序后的文档。

::: details MongoDB shell 运行结果
```json
[
  { _id: '2022-01-12', totalOrderValue: 790, averageOrderQuantity: 30 },
  { _id: '2021-03-13', totalOrderValue: 770, averageOrderQuantity: 15 },
  { _id: '2021-03-17', totalOrderValue: 630, averageOrderQuantity: 30 },
  { _id: '2021-01-13', totalOrderValue: 350, averageOrderQuantity: 10 }
]
```
:::


更多管道操作可以[查看官方文档说明](https://www.mongodb.com/docs/manual/aggregation/)。