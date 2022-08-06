# MongoDB 介绍

## MongoDB 介绍

- MongoDB 是一个功能最丰富的NoSQL非关系数据库。由 C++ 语言编写。
- MongoDB 本身提供S端存储数据，即 Server ；也提供C端操作处理（如查询等）数据，即 Client 。

> [MongoDB 官网](https://www.mongodb.com/)
> 
> [MongoDB 官方文档](https://docs.mongodb.com/manual/introduction/)

## 与传统关系型数据库对比

### 数据组成不同

传统关系型数据库：数据库、表和列组成，而 MongoDB 中也有类似的概念：数据库、集合和文档。

| 传统关系型数据库 | MongoDB 数据库 |
| ---- | ---- |
| 数据库 Database | 数据库 Database |
| 表 Table | 集合 Collection |
| 数据行 Row | 文档 Document |

### 数据之间关联性

相比于传统关系型数据库而言，MongoDB 可以把外部数据直接存储在文档中，而无需定义文档的存储结构。

这样做的优点是可以提高查询效率，缺点是对关联数据更新时会相对复杂。

而在传统关系型数据库在数据存储前需要定义好表中的每条数据的字段。

[SQL 和 NoSQL 的区别](https://www.cnblogs.com/jeakeven/p/5402095.html)


## MongoDB 优势

MongoDB 作为非关系型数据库相较于关系型数据库有如下优势：

- 易扩展

  NoSQL 数据库种类繁多，但是一个共同的特点都是去掉关系数据库的关系型特性。数据之间无关系，这样就非常容易扩展

- 大数据量，高性能

  NoSQL数据库都具有非常高的读写性能，尤其在大数据量下表现优秀。这得益于它的非关系性，数据库的结构简单

- 灵活的数据模型

  NoSQL无需事先为要存储的数据建立字段，随时可以存储自定义的数据格式。
  而在关系数据库中，增删字段是一件非常麻烦的事情。如果同时存在非常大数据量的表，增加字段代价将非常巨大。

