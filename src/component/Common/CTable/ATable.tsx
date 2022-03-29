import React from 'react';
import { Table, Pagination } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { classnames, space, textAlign } from '~/tailwindcss-classnames';

type TableConfig = {
  showHeader?: boolean;
  pagination?: false | TablePaginationConfig;
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  };
  bordered?: boolean;
};

type TableProp = {
  columns: Array<object>;
  dataSource: Array<object>;
};

export interface TablePropsType {
  config?: TableConfig;
  data: TableProp;
}

export function AntdTable(props: TablePropsType) {
  const { config, data } = props;
  return (
    <div className={classnames(space('space-y-5'))}>
      <Table
        rowKey={(record) => JSON.stringify(record)}
        columns={data.columns}
        dataSource={data.dataSource}
        showHeader={config?.showHeader}
        pagination={false}
        scroll={config?.scroll}
        bordered={config?.bordered}
      />
      {config?.pagination && (
        <Pagination className={classnames(textAlign('text-right'))} />
      )}
    </div>
  );
}

AntdTable.defaultProps = {
  config: {
    bordered: true,
    pagination: {},
    showHeader: true,
    scroll: {},
  },
  data: {
    columns: [],
    dataSource: [],
  },
};
