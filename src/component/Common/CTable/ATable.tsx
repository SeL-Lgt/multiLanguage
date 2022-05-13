import React, { Attributes } from 'react';
import { Table, Pagination } from 'antd';
import { classnames, space, textAlign } from '~/tailwindcss-classnames';

interface PaginationType {
  pageSize?: number;
  current: number;
  total: number;
}

interface TableConfig {
  showHeader?: boolean;
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  };
  bordered?: boolean;
}

interface TableProp {
  columns: Array<object>;
  dataSource: Array<object>;
}

export interface TablePropsType extends Attributes {
  config?: TableConfig;
  data: TableProp;
  pagination?: PaginationType;
  pageChange?: (page: number, pageSize: number) => unknown;
}

export function AntdTable(props: TablePropsType) {
  const { config, data, pagination, pageChange } = props;
  const pageChangeEvent = (page: number, pageSize: number) => {
    if (pageChange) {
      pageChange(pagination?.pageSize === pageSize ? page : 1, pageSize);
    }
  };
  return (
    <div className={classnames(space('space-y-5'))}>
      <Table
        rowKey={(record) => JSON.stringify(record)}
        columns={data.columns}
        dataSource={data.dataSource}
        showHeader={config?.showHeader}
        pagination={false}
        scroll={config?.scroll}
        bordered={config?.bordered || true}
      />
      {pagination && (
        <Pagination
          key={pagination?.current}
          total={pagination?.total || 0}
          current={pagination?.current}
          defaultCurrent={pagination?.current || 1}
          defaultPageSize={pagination?.pageSize || 10}
          showQuickJumper
          onChange={(page, pageSize) => pageChangeEvent(page, pageSize)}
          className={classnames(textAlign('text-right'))}
          showTotal={(total) => `总条数：${total}`}
        />
      )}
    </div>
  );
}

AntdTable.defaultProps = {
  config: {
    bordered: true,
    showHeader: true,
    scroll: {},
  },
  data: {
    columns: [],
    dataSource: [],
  },
};
