import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Mensaje } from './mensaje.entity';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { UpdateMensajeDto } from './dto/update-mensaje-dto';



@Injectable()
export class MensajesService {

  constructor(
    @InjectRepository(Mensaje)
    private mensajeRepository: Repository<Mensaje>,
  ) {}

  
  async getAll(): Promise<Mensaje[]> {
    return await this.mensajeRepository.find();
  }


  async createMensaje( mensajeNuevo: CreateMensajeDto ): Promise<Mensaje>{
    const nuevo = new Mensaje();
    nuevo.nick = mensajeNuevo.nick;
    nuevo.mensaje = mensajeNuevo.mensaje;

    const fecha = new Date();
    const mes = fecha.getMonth() +1;
    const mesStr = ( mes.toString().length === 1 ) ? '0'+mes : mes;
    nuevo.createat = fecha.getFullYear()+'-' + mesStr +'-' + fecha.getDate()+' ' + fecha.getHours()+':' + fecha.getMinutes()+':' + fecha.getSeconds() + '.01';

    return await this.mensajeRepository.save( nuevo );
  }


  async updateMensaje(idMensahe: number, mensajeNuevaInfo: CreateMensajeDto ): Promise<Mensaje>{
    const mensajeActualizar = await this.mensajeRepository.findOne(idMensahe);

    mensajeActualizar.nick = mensajeNuevaInfo.nick;
    mensajeActualizar.mensaje = mensajeNuevaInfo.mensaje;

    const fecha = new Date();
    const mes = fecha.getMonth() +1;
    const mesStr = ( mes.toString().length === 1 ) ? '0'+mes : mes;
    mensajeActualizar.createat = fecha.getFullYear()+'-' + mesStr +'-' + fecha.getDate()+' ' + fecha.getHours()+':' + fecha.getMinutes()+':' + fecha.getSeconds() + '.01';
    
    return await this.mensajeRepository.save( mensajeActualizar );
  }


  async deleteMensaje( idMensaje:number ): Promise<any>
  {
    return await this.mensajeRepository.delete(idMensaje);
  }

}
