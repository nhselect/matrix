import { IBody, ILink } from './index'

export interface IResource {
  slug: string
  type: string
  manufacturer: string
  model: string
  links: ILink[]
  toc: any[]
  body: IBody
  dir: string
  path: string
  extension: string
  createdAt: Date
  updatedAt: Date
}
