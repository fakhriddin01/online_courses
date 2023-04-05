import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './models/status.model';

@Injectable()
export class StatusService {
constructor(@InjectModel(Status) private readonly statusRepo: typeof Status){}

  create(createStatusDto: CreateStatusDto) {
    return this.statusRepo.create(createStatusDto);
  }

  findAll() {
    return this.statusRepo.findAll({include: {all:true}});
  }
  

  findOne(id: number) {
    return this.statusRepo.findOne({where: {id}, include:{all:true}});
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return this.statusRepo.update(updateStatusDto, {where: {id}});
  }

  remove(id: number) {
    return this.statusRepo.destroy({where: {id}});
  }
}
