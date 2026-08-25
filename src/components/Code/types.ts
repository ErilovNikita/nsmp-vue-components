export type CodeLanguage =
  | 'bash'
  | 'css'
  | 'html'
  | 'javascript'
  | 'json'
  | 'plaintext'
  | 'typescript'
  | 'vue'

export interface CodeProps {
  code: string
  copyable?: boolean
  language?: CodeLanguage
  lineNumbers?: boolean
  title?: string
  wrap?: boolean
}
