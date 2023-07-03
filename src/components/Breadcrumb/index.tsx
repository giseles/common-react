import React, { memo, useEffect, useState } from 'react'
import { Link } from 'umi'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import styles from './index.less'

export const Breadcrumb = memo((props) => {
  const { pathname, breadcrumbList, ablePathList } = props
  const [items, setItems] = useState([])

  const specialList = {
    nameList: {
      form: '表单',
      info: '个人中心'
    },
    jumpList: {
      monitor: null,
      alarm: null,
      system: null,
      form: null,
      detail: null
    }
  }

  useEffect(() => {
    const { nameList, jumpList } = specialList
    const pathSnippets: string[] = pathname?.split('/').filter((i: string) => i)

    const items = []
    ablePathList.includes('/home') &&
      items.push({
        title: <Link to="/home">首页</Link>
      })
    if (pathname !== '/home') {
      pathSnippets.forEach((_, index) => {
        const path = '/' + pathSnippets.slice(0, index + 1).join('/')

        const name = nameList[_] ? nameList[_] : breadcrumbList[path]?.name
        const to = Object.keys(jumpList).includes(_) ? jumpList[_] : path
        if (name) {
          items.push({
            title: to ? <Link to={to}>{name}</Link> : name
          })
        }
      })
    }

    setItems(items)
  }, [pathname, breadcrumbList, ablePathList])

  const property = {
    separator: '/'
  }

  return <AntdBreadcrumb className={styles.wrap} items={items} {...property} />
})
