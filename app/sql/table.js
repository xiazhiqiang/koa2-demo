const test = `
create table if not exists test (
    id bigint(11) not null auto_increment comment '自增ID',
    content text not null comment '内容',
    ct int(10) not null default 0 comment '时间戳',
    primary key (id),
    index ct (ct)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='测试表';
`;

module.exports = {
  test: test
};