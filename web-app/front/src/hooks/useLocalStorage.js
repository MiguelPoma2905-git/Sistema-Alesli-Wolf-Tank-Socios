import { useState, useEffect } from 'react'

/**
 * useState that syncs with localStorage
 * @param {string} key   - localStorage key
 * @param {*}      init  - initial / default value
 */
export function useLocalStorage(key, init) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore write errors */
    }
  }, [key, value])

  return [value, setValue]
}