import React, { memo, useState } from 'react'
import { useDeepCompareEffect } from 'common-hook'
import { diffTime } from 'common-screw'
import {  Table } from 'antd'
import { getDateDiffList } from '@/utils'
import styles from './index.module.less'

export const Gantt = memo((props: any) => {
  const { columns: initColumns, dataSource, dateRange } = props
  const [columns, setColumns] = useState<any>([])

  useDeepCompareEffect(() => {
    if (!initColumns || !dateRange) return
    const dayDiff = Number(diffTime(dateRange[0], dateRange[1], true)[0]) + 1
    const dateList: any = getDateDiffList(dateRange[0], dateRange[1])
    const per = Number((100 / dayDiff).toFixed(3))

    const top: any = []
    const bottom: any = []
    Object.keys(dateList).forEach((key: any, index: any) => {
      const item = dateList[key]
      top.push(
        <li key={index} style={{ width: per * item.length + '%' }}>
          {key}
        </li>
      )
      for (let i = 0, len = item.length; i < len; i++) {
        bottom.push(
          <li key={index + '-' + i} style={{ width: per + '%' }}>
            {item[i]}
          </li>
        )
      }
    })

    setColumns([
      ...initColumns,
      {
        title: (
          <div className={styles.date}>
            <ul className={styles.top}>{top}</ul>
            <ul className={styles.bottom}>{bottom}</ul>
          </div>
        ),
        key: 'date',
        render: (item: any, _: any) => {
          if (_.startDay && _.endDay) {
            const width = (Number(diffTime(_.startDay, _.endDay, true)[0]) + 1) * per
            const marginLeft = Number(diffTime(dateRange[0], _.startDay, true)[0]) * per
            return (
              <div className={styles.barWrap}>
                <div
                  className={styles.bar}
                  style={{ width: width + '%', marginLeft: marginLeft + '%' }}
                >
                  d
                </div>
              </div>
            )
          }
          return null
        }
      }
    ])
  }, [initColumns, dateRange])

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: true }}
      bordered
      pagination={false}
      rowKey={(record: any) => record.key}
    />
  )
})
