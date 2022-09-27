import * as mongoose from 'mongoose'
import { Schema, Model, FilterQuery } from 'mongoose'
import { PageInfo } from './page-info'
import { PaginationArgs } from './pagination-args'

export declare class PaginationModel<T extends mongoose.Document> {
  totalDocs: number | undefined
  limit: number | undefined
  totalPages: number | undefined
  page: number | undefined
  pagingCounter: number | undefined
  hasPrevPage: boolean | undefined
  hasNextPage: boolean | undefined
  prevPage: number | undefined
  nextPage: number | undefined
  hasMore: boolean | undefined
  docs: T[]
}
export interface Pagination<T extends mongoose.Document> extends Model<T> {
  paginate(
    filter?: FilterQuery<T>,
    options?: PaginationArgs,
    callback?: Function | undefined,
  ): Promise<PaginationModel<T> | undefined>
}
export declare function mongoosePagination<T extends mongoose.Document>(
  schema: Schema<T>,
): void
