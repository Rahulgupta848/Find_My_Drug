import { Table } from 'antd';
import React, { ReactNode } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

interface Props<ObjectType> {
    columns: {
        title: string | ReactNode;
        dataIndex?: keyof ObjectType | string;
        render?: any;
        key?: string;
        fixed?: any;
        width?: number | string;
        sorter?: (a: any, b: any) => any;
    }[];
    data: ObjectType[];
    loading?: boolean;
    actions?: {
        show: boolean;
        title?: string;
        width?: number;
        fixed?: string;
        layout: (d: ObjectType) => React.ReactNode;
    };
    pagination?: {
        isShow: boolean;
        customePagination?: any;
    };
    rowKey?: (d: any) => string;
    onRowClick?: (d: ObjectType, key?: string) => void;
    summary?: (d: any) => React.ReactNode;
    rowSelection?: Object;
    className?: string;
    isHideSort?: boolean;
}

const CTable = <ObjectType extends {}>({ columns, data, isHideSort, loading, actions, pagination, rowKey, onRowClick, summary, rowSelection, className }: Props<ObjectType>) => {
    if (actions?.show && columns.findIndex((c) => c.key === 'x_action') === -1) {
        columns.push({
            title: actions.title || 'Actions',
            dataIndex: '',
            key: 'x_action',
            fixed: actions.fixed || 'right',
            width: actions.width || 100,
            render: actions.layout,
        });
    }
    return (
        <div id="table">
            <div className={`table-row-dark ${className}`}>
                <Table
                    columns={columns.map((c) => {
                        if (c.key !== 'x_action') {
                            return {
                                ...c,
                                key: String(c.dataIndex),
                                dataIndex: String(c.dataIndex),
                                title: ({ sortColumns }: any) => {
                                    const sortedColumn = sortColumns?.find(({ column }: any) => column.key === c.dataIndex);
                                    return (
                                        <p className="whitespace-nowrap flex items-center justify-center mb-0">
                                            {c.title}
                                            {sortedColumn && !isHideSort ? sortedColumn.order === 'ascend' ? <BsArrowUp className="ml-1" /> : sortedColumn.order === 'descend' ? <BsArrowDown className="ml-1" /> : null : null}
                                        </p>
                                    );
                                },
                                ellipsis: true,
                                sorter: c.sorter ? c.sorter : (a: any, b: any) => String(a[String(c.dataIndex)]).localeCompare(String(b[String(c.dataIndex)])),
                                onCell: (record: ObjectType) => {
                                    return {
                                        onClick: () => {
                                            if (c.key !== 'x_action' && onRowClick) {
                                                onRowClick(record, String(c.dataIndex));
                                            }
                                        },
                                    };
                                },
                            };
                        } else {
                            return {
                                ...c,
                                key: String(c.dataIndex),
                                dataIndex: String(c.dataIndex),
                                title: () => <p className="whitespace-nowrap">{c.title}</p>,
                                ellipsis: true,
                                onCell: (record: ObjectType) => {
                                    return {
                                        onClick: () => {
                                            if (c.key !== 'x_action' && onRowClick) {
                                                onRowClick(record, String(c.dataIndex));
                                            }
                                        },
                                    };
                                },
                            };
                        }
                    })}
                    dataSource={data}
                    scroll={{ x: 400 }}
                    loading={loading}
                    rowKey={rowKey}
                    pagination={
                        pagination?.isShow
                            ? pagination.customePagination || { position: ['bottomRight'], style: { marginRight: '15px' }, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`, showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }
                            : false
                    }
                    summary={summary}
                    rowSelection={rowSelection}
                    showSorterTooltip={false}
                    sticky
                    bordered
                />
            </div>
        </div>
    );
};

export default CTable;
