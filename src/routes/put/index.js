import React from 'react';
import { connect } from 'dva';
import { Button, Table, Divider, Select, Popconfirm, Tooltip } from 'antd';
import styles from './index.less';
import PutModal from './modal';

const { Column } = Table;
const Option = Select.Option;

const PutPage = ({ dispatch, put }) => {
  function handleDelete(row) {
    dispatch({
      type: 'put/deleteTableRow',
      query: {
        id: row.id
      }
    });
  }
  function appIdChange(appId) {
    dispatch({
      type: 'put/changeAppId',
      appId
    });
  }
  function showModal(query) {
    dispatch({
      type: 'put/showModal',
      query
    });
  }
  function handleTableChange(query) {
    dispatch({
      type: 'put/changePage',
      query
    });
  }
  function handleEdit(row) {
    dispatch({
      type: 'put/showModal',
      query: {
        title: '编辑投放页',
        row
      }
    });
  }
  return (
    <div className={styles.mangePutPage}>
      <div className={styles.applyContent}>
        <div className={styles.applyTitle}>应用：</div>
        <div className={styles.applyInput}>
          <Select
            style={{ width: '300px' }}
            value={put.appId}
            onChange={appIdChange}
          >
            {put.appIdList.map(ele => {
              return (
                <Option value={ele.id} key={ele.id}>
                  {ele.desc}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div className={styles.radioGroup}>
        <Button
          type="primary"
          className={styles.buttonRight}
          onClick={() => showModal({ title: '新增投放页' })}
        >
          新增
        </Button>
      </div>
      <Table
        bordered
        size="small"
        rowKey="id"
        pagination={put.pagination}
        loading={put.loading}
        onChange={handleTableChange}
        dataSource={put.tableData}
      >
        <Column
          title="页面别名"
          dataIndex="disName"
          align="center"
          key="disName"
        />
        <Column
          title="android页面唯一id"
          dataIndex="androidValue"
          align="center"
          key="androidValue"
          width="300px"
          render={(text, records) => (
            <span>
              {records.androidValue ? (
                records.androidValue.length < 18 ? (
                  <div className={styles.widthLimit}>
                    {records.androidValue}
                  </div>
                ) : (
                  <Tooltip title={records.androidValue}>
                    <div className={styles.widthLimit}>
                      {records.androidValue}
                    </div>
                  </Tooltip>
                )
              ) : (
                ''
              )}
            </span>
          )}
        />
        <Column
          title="ios页面唯一id"
          dataIndex="iosValue"
          align="center"
          key="iosValue"
          width="300px"
          render={(text, records) => (
            <span>
              {records.iosValue ? (
                records.iosValue.length < 18 ? (
                  <div className={styles.widthLimit}>{records.iosValue}</div>
                ) : (
                  <Tooltip title={records.iosValue}>
                    <div className={styles.widthLimit}>{records.iosValue}</div>
                  </Tooltip>
                )
              ) : (
                ''
              )}
            </span>
          )}
        />
        <Column
          title="一天弹屏限制"
          dataIndex="fireworkCountOneDay"
          key="fireworkCountOneDay"
          align="center"
        />
        <Column
          title="弹屏间隔时间"
          align="center"
          dataIndex="intervalSeconds"
          key="intervalSeconds"
        />
        <Column
          title="操作"
          key="action"
          align="center"
          width="100px"
          render={(text, record) => (
            <span>
              <span
                className={styles.tableOperate}
                onClick={() => handleEdit(text)}
              >
                编辑
              </span>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除此页面？"
                onConfirm={() => handleDelete(text)}
                placement="topRight"
              >
                <span className={styles.tableOperate}>删除</span>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <PutModal />
    </div>
  );
};

export default connect(({ put }) => ({ put }))(PutPage);
