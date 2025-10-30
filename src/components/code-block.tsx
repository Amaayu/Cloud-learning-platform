"use client"

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="code-block relative rounded-lg border bg-muted/50">
      {title && (
        <div className="px-4 py-2 border-b bg-muted/80 rounded-t-lg">
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
      
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            borderRadius: title ? '0 0 0.5rem 0.5rem' : '0.5rem',
            background: 'transparent',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
        
        <Button
          variant="ghost"
          size="sm"
          className="copy-button absolute top-2 right-2 h-8 w-8 p-0"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}