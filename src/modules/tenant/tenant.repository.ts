import { Delete, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { PaginationArgs } from '@shared/pagination/pagination-args';
import { Pagination } from '@shared/pagination'
import { Tenant, TenantDocument } from './tenant.model';


@Injectable()
export class TenantRepository {
    constructor(
        @InjectModel('Tenant') private tentantModel: Pagination<TenantDocument>
    ){}


    async list(query: FilterQuery<TenantDocument>, pagination: PaginationArgs){
        return await this.tentantModel.paginate(query, pagination)
    }

    async create(data: Tenant): Promise<TenantDocument> {
        const tenant = new this.tentantModel(data);
        const tenantSaved = await tenant.save()
        return tenantSaved;
    }

    async updateOne(
        id: string | Types.ObjectId,
        update: UpdateQuery<TenantDocument>,
    ): Promise<TenantDocument> {
        return await this.tentantModel.findByIdAndUpdate(id, update, {
          new: true,
       })
    }
  
    async findOne(
        query: FilterQuery<TenantDocument>,
      ): Promise<TenantDocument> {
        return await this.tentantModel.findOne(query)
    }
    
    async delete(id: string): Promise<TenantDocument> {
        return await this.tentantModel.findByIdAndDelete(id)
    }
}