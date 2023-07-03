import { getDvaApp, history } from 'umi'
import { isObject, isString } from 'common-screw'

export const Message = (data) => {
  const msg = data?.msg?.substr(0, 30) || data?.substr(0, 30)

  if (data.code === '401') {
    history.push('/login')
  }
  if (data.code === '8001') {
    messageBase.success(msg)
  } else if (data.code === 'loading') {
    messageBase.loading(msg)
  } else {
    messageBase.error(msg)
  }
}

export const messageBase = {
  success: (props) => commonMessage('success', props),
  error: (props) => commonMessage('error', props),
  info: (props) => commonMessage('info', props),
  warning: (props) => commonMessage('warning', props),
  loading: (props) => commonMessage('loading', props)
}

const commonMessage = (type, config) => {
  let content = {}
  if (isString(config)) {
    content = {
      content: config
    }
  } else if (isObject(config)) {
    content = {
      ...config
    }
  }
  getDvaApp()._store.dispatch({
    type: 'common/toMessage',
    payload: { type, time: +new Date(), ...content }
  })
}
