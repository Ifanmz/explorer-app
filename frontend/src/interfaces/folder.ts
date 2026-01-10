export interface Folder {
  id: number
  name: string
  parentid?: number
  data?: Folder[]
}
