import React from 'react';
import { connect } from 'dva';
import { Radio, Table, Tag, Select } from 'antd';
import styles from './index.less';

const RadioGroup = Radio.Group;
const { Column } = Table;
const Option = Select.Option;

const ApprovePage = ({ dispatch, approve }) => {
  const {
    appId,
    appIdList,
    typeValue,
    pagination,
    loading,
    tableData
  } = approve;
  function appIdChange(appId) {
    dispatch({
      type: 'approve/changeAppId',
      appId
    });
  }
  function changeRadio(e) {
    dispatch({
      type: 'approve/changeRadio',
      typeValue: e.target.value
    });
  }
  function handleTableChange(query) {
    dispatch({
      type: 'approve/changePage',
      query
    });
  }
  return (
    <div className={styles.approveCont}>
      <div className={styles.applyContent}>
        <div className={styles.applyTitle}>应用：</div>
        <div className={styles.applyInput}>
          <Select
            style={{ width: '300px' }}
            value={appId}
            onChange={appIdChange}
          >
            {appIdList.map(ele => {
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
        <RadioGroup onChange={changeRadio} value={typeValue}>
          <Radio value={1}>待我审批</Radio>
          <Radio value={2}>我已审核</Radio>
        </RadioGroup>
      </div>
      {typeValue === 1 ? (
        <Table
          bordered
          size="small"
          rowKey="id"
          pagination={pagination}
          loading={loading}
          dataSource={tableData}
          onChange={handleTableChange}
          style={{ display: typeValue === 1 ? 'block' : 'none' }}
        >
          <Column
            title="计划名称"
            dataIndex="planName"
            key="planName"
            align="center"
          />
          <Column
            title="申请人"
            dataIndex="creatorName"
            key="creatorName"
            align="center"
            render={(text, record) => (
              <Tag color="cyan">{record.creatorName}</Tag>
            )}
          />
          <Column
            title="申请日期"
            dataIndex="createAt"
            key="createAt"
            align="center"
          />
          <Column
            title="待审批页面"
            dataIndex="detail"
            key="detail"
            align="center"
          />
          <Column
            title="可审批人"
            dataIndex="auditors"
            key="auditors"
            align="center"
            render={(text, record) => (
              <span>
                {record.auditors.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag.disName}
                  </Tag>
                ))}
              </span>
            )}
          />
        </Table>
      ) : null}
      {typeValue === 2 ? (
        <Table
          bordered
          size="small"
          rowKey="id"
          pagination={pagination}
          loading={loading}
          dataSource={tableData}
          onChange={handleTableChange}
        >
          <Column
            title="计划名称"
            dataIndex="planName"
            key="planName"
            align="center"
          />
          <Column
            title="申请人"
            dataIndex="creatorName"
            key="creatorName"
            align="center"
            render={(text, record) => (
              <Tag color="cyan">{record.creatorName}</Tag>
            )}
          />
          <Column
            title="申请日期"
            dataIndex="createAt"
            key="createAt"
            align="center"
          />
          <Column
            title="审批日期"
            dataIndex="operateAt"
            key="operateAt"
            align="center"
          />
          <Column
            title="审批页面"
            dataIndex="detail"
            key="detail"
            align="center"
          />
          <Column
            title="审批结果"
            dataIndex="auditType"
            key="auditType"
            align="center"
          />
          <Column
            title="审批人"
            dataIndex="auditorName"
            key="auditorName"
            align="center"
            render={(text, record) => (
              <Tag color="blue">{record.auditorName}</Tag>
            )}
          />
        </Table>
      ) : null}
    </div>
  );
};

export default connect(({ approve }) => ({ approve }))(ApprovePage);
