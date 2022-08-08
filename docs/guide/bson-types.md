# MongoDB 数据类型

BSON 是一种二进制序列化格式，用于在 MongoDB 中存储文档和进行远程过程调用。

每种 BSON 类型都有整数和字符串标识符，如下表所示：

| 数据类型 | 数值 | 别名 | 简要说明 |
| ---- | ---- | ---- | ---- |
| `Double` | 1 | `double` | 浮点数 |
| `String` | 2 | `string` |  字符串，常用，必须是有效的UTF-8 |
| `Object` | 3 | `object` | MongoDB 中的一条数据/文档，即文档嵌套文档 |
| `Arrays` | 4 | `array` | 数组 / 列表 |
| `Object ID` | 7 | `objectId` | 文档ID / 数据的ID，数据的主键 |
| `Boolean` | 8 | `bool`  | 存储一个布尔值，`true` 或 `false` |
| `Null` | 10 | `null` | 存储 null 值 |
| `Date` | 9 | `date` | 存储当前日期或时间的UNIX时间格式 |
| `32-bit integer` | 16  | `int` | 32位整数 |
| `Timestamp` | 17 | `timestamp` | 时间戳，表示从 1970-1-1 到现在的总秒数 |
| `64-bit integer` | 18  | `long` | 64位整数 |

> 每个文档每个文档都有一个属性，为 `_id`，保证每个文档的唯一性，在 MongoDB 中默认使用 `_id` 作为主键。可以手动设置 `_id` 的值，如果没有提供，那么 MongoDB 为每个文档提供了一个独特的 `_id`， 类型为 `objectID`。
> 
>
> `objectID` 是一个 12 字节的十六进制数，每个字节两位，一共是 24 位的字符串：
> 
> 一个 4 字节的时间戳，表示 ObjectId 的创建，以 Unix 纪元以来的秒数为单位。
>? 每个进程生成一次的 5 字节随机值。这个随机值对于机器和过程是唯一的。
一个 3 字节递增计数器，初始化为随机值。


更多 Bson类型可以在[这里查看](https://www.mongodb.com/docs/manual/reference/bson-types/#bson-types)。