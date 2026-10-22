import { useState, useCallback } from 'react'

export const useClipboard = (timeout = 2000) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copy = useCallback(
    async (text: string, key = 'default') => {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedKey(key)
        setTimeout(() => {
          setCopiedKey(null)
        }, timeout)
        return true
      } catch (err) {
        console.error('Clipboard copy failed:', err)
        return false
      }
    },
    [timeout]
  )

  return { copy, copiedKey }
}
