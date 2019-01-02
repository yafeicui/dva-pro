import { connect } from 'dva';
import { Table, Button, Divider, Popconfirm, Tag } from 'antd';
import DeviceModal from './modal';
import styles from './index.less';

const { Column } = Table;

const DevicePage = ({ dispatch, device }) => {
  // 展示modal
  function showModal(query) {
    dispatch({
      type: 'device/showModal',
      query
    });
  }
  function handleDelete(id) {
    dispatch({
      type: 'device/deleteTableRow',
      query: {
        id
      }
    });
  }
  function handleEdit(row) {
    dispatch({
      type: 'device/showModal',
      query: {
        title: '编辑设备',
        row
      }
    });
  }
  // 分页
  function handleTableChange(query) {
    dispatch({
      type: 'device/changePage',
      query
    });
  }
  return (
    <div>
      <div className={styles.addButton}>
        <Button type="primary" onClick={() => showModal({ title: '新增设备' })}>
          新增
        </Button>
      </div>
      <Table
        bordered
        size="small"
        rowKey="id"
        pagination={device.pagination}
        loading={device.loading}
        onChange={handleTableChange}
        dataSource={device.tableData}
      >
        <Column
          title="设备信息"
          dataIndex="deviceId"
          key="deviceId"
          align="center"
        />
        <Column
          title="公司唯一机器码"
          dataIndex="serialNumber"
          key="serialNumber"
          align="center"
        />
        <Column title="机型" dataIndex="model" key="model" align="center" />
        <Column
          title="设备持有者"
          dataIndex="owner"
          key="owner"
          align="center"
          render={(text, record) => {
            return record.owner !== '' ? (
              <Tag color="blue">{record.owner}</Tag>
            ) : (
              ''
            );
          }}
        />
        <Column
          title="用户id白名单"
          dataIndex="userId"
          key="userId"
          align="center"
        />
        <Column
          title="创建日期"
          dataIndex="createAt"
          key="createAt"
          align="center"
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
                title="确定删除此条数据？"
                onConfirm={() => handleDelete(text.id, 1)}
                placement="topRight"
              >
                <span className={styles.tableOperate}>删除</span>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <DeviceModal />
    </div>
  );
};

export default connect(({ device }) => ({ device }))(DevicePage);
