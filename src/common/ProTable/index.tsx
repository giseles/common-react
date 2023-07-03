import React, { useCallback, memo, useEffect } from 'react'
import { connect } from 'umi'
import { Modal, Tooltip, Space } from 'antd'
import { useDeepCompareEffect, useUnmount } from 'common-hook'
import { isNil } from 'common-screw'
import { Table, Search, Button, FormModal } from '@/components'
import { toPush } from '@/utils'
import styles from './index.less'

const Model = ({ global, proTable }) => ({ global, proTable })

export const ProTable = connect(Model)(
  memo(({ dispatch, global, proTable, ...props }) => {
    const {
      title,
      add,
      apiList,
      tableProps: tabProp = {},
      initSearch = {},
      formList = {},
      exportBtn = null,
      getSearch = null,
      searchChild = null,
      searchBtm = null,
      addHandle = null,
      urlList = null,
      toBase,
      base: initBase = null,
      dataSource: initDataSource = null,
      toData,
      refresh = 0 // 重刷
    } = props
    const { permissionList, baseEnum } = global
    const { dataSource, searchParams, total, loading, base, sortList, formModal, expBtn } = proTable

    const searchProps = {
      title,
      search: base.search,
      add,
      addHandle,
      searchBtm,
      children: searchChild || expBtn
    }
    const tableProps = {
      columns: base.columns,
      loading,
      dataSource: initDataSource || dataSource,
      current: searchParams.page,
      pageSize: searchParams.pageSize,
      total,
      ...tabProp
    }

    useDeepCompareEffect(() => {
      dispatch({
        type: 'proTable/toInit',
        payload: {
          apiList,
          searchParams: { page: 1, pageSize: 10, ...initSearch, ...sortList }
        }
      })
    }, [apiList, initSearch, sortList])

    useDeepCompareEffect(() => {
      // 获取 base: { search: [], columns: [] }
      if (toBase && isNil(baseEnum)) return
      const { search = null, columns } = initBase || toBase(baseEnum)
      dispatch({
        type: 'proTable/toUpdate',
        payload: {
          base: { search, columns: toSortCol(columns, sortList) }
        }
      })
    }, [initBase, toBase, baseEnum, sortList])

    useDeepCompareEffect(() => {
      // toData
      if (toData && !isNil(dataSource)) {
        toData(dataSource)
      }
    }, [toData, dataSource])

    const toSortCol = (columns, sortList) => {
      const newCol = [...columns]
      columns.forEach((_, index) => {
        const { label, name, sort, ...rest } = _
        if (sort) {
          const isSort = sortList.sortField === name ? sortList.isAsc : undefined
          newCol[index] = {
            name,
            ...rest,
            label: (
              <Tooltip
                title={!isSort ? '点击升序' : '点击降序'}
                onClick={() => toSort(name, !isSort)}
              >
                <Space style={{ cursor: 'pointer' }}>
                  {label}
                  {isSort === undefined && (
                    <div className={[styles.sort, styles.sortNo].join(' ')} />
                  )}
                  {isSort === true && <div className={[styles.sort, styles.sortUp].join(' ')} />}
                  {isSort === false && <div className={[styles.sort, styles.sortDown].join(' ')} />}
                </Space>
              </Tooltip>
            )
          }
        }
      })
      return newCol
    }

    const toSort = (sortField, isAsc) => {
      // true 为升序，false为降序
      dispatch({
        type: 'proTable/toUpdate',
        payload: {
          sortList: { sortField, isAsc }
        }
      })
    }
    useEffect(() => {
      // 重刷
      refresh && dispatch({ type: 'proTable/toList' })
    }, [refresh])

    // 组件卸载
    useUnmount(() => dispatch({ type: 'common/toReset', payload: { name: 'proTable' } }))

    useDeepCompareEffect(() => {
      getSearch && getSearch(searchParams)
    }, [searchParams])

    useDeepCompareEffect(() => {
      //TODO  导出 按钮等
      exportBtn &&
        permissionList.exp &&
        dispatch({
          type: 'proTable/toUpdate',
          payload: {
            expBtn: (
              <Button
                key="exp"
                type="exp"
                name="导出"
                onClick={() => onExp(exportBtn.fileName, apiList.apiExp, searchParams)}
              />
            )
          }
        })
    }, [exportBtn, permissionList.exp, searchParams])

    const onSearch = (payload) => {
      dispatch({ type: 'proTable/toList', payload })
    }

    const onHandle = (type: any, item: any = {}) => {
      switch (type) {
        case 'del': // 删除
          Modal.confirm({
            title: '确定要删除吗?',
            onOk: () =>
              dispatch({
                type: 'proTable/toDelete',
                payload: { id: item.id }
              })
          })
          break
        case 'able': // 启用禁用
          Modal.confirm({
            title: item.status === 1 ? '确定要禁用吗?' : '确定要启用吗?',
            // 1启用 0禁用
            onOk: () =>
              dispatch({
                type: 'proTable/toAble',
                payload: { id: item.id, operation: item.status === 0 ? 1 : 0 }
              })
          })
          break
        case 'add': // 添加
          urlList.form && toPush(urlList.form)
          // setFormModal({ open: true, title: '添加', type, initialValues: {} })
          break
        case 'edit': // 编辑
          urlList.form && toPush(urlList.form, { id: item.id })
          // setFormModal({
          //   open: true,
          //   title: '编辑',
          //   type,
          //   initialValues: item
          // })
          break
        case 'detail': // 详情
          if (urlList.detail) {
            toPush(urlList.detail, { id: item.id }) // 跳转
          }
          break
        default:
      }
    }

    const onExp = (name, api, searchParams) => {
      dispatch({
        type: 'common/toExport',
        payload: {
          name,
          api,
          searchParams
        }
      })
    }
    const closeFormModal = useCallback(() => {
      dispatch({
        type: 'proTable/toUpdate',
        payload: {
          formModal: { open: false }
        }
      })
    }, [])

    return (
      <>
        <>
          {searchProps.search && (
            <Search
              {...searchProps}
              onChange={(value: any) =>
                onSearch({ ...value, page: 1, pageSize: searchParams.pageSize })
              }
              addClick={onHandle}
            />
          )}
          <Table
            {...tableProps}
            onChange={({ current, pageSize }: any) => onSearch({ page: current, pageSize })}
            onHandle={(type: any, item: any) => onHandle(type, item)}
          />
        </>
        <FormModal
          formList={formList}
          apiList={apiList}
          {...formModal}
          hideModal={closeFormModal}
          okModal={useCallback(() => {
            dispatch({ type: 'proTable/toList' })
            closeFormModal
          }, [])}
        />
      </>
    )
  })
)
