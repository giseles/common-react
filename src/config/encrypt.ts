import AES from 'crypto-js/aes'
import ENC_UTF8 from 'crypto-js/enc-utf8'
import ECB_MODE from 'crypto-js/mode-ecb'
import PAD_PKCS7 from 'crypto-js/pad-pkcs7'

export const Encrypt = (word) => {
  const SECRET = 'dsjhkghibdzskjbv' // 密匙
  const key = ENC_UTF8.parse(SECRET)

  const srcs = ENC_UTF8.parse(word)

  const encrypted = AES.encrypt(srcs, key, {
    mode: ECB_MODE,
    padding: PAD_PKCS7
  })

  return encrypted.toString()
}
