import React from 'react'
import { connect } from 'umi'

const Model = ({ home }) => {
  return { home }
}
export default connect(Model)(({ dispatch, home }) => {
  return <div>Home</div>
})
