import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { UpdateMensajeDto } from './dto/update-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

  constructor( private mensajeService: MensajesService ){

  }

  /* 
  - Paramtero recibido desde la URL como 'id'
  @Param('id') id: number
  - Parametro recibido desde POST del form
  @Body() variable: TipoVariable
  */

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto, @Res() resp ) {
    console.log('++++++++ Creando el mensaje:');
    console.log( createMensajeDto );
    this.mensajeService.createMensaje( createMensajeDto )
    .then( (mensajeServer) => {
      resp.status( HttpStatus.CREATED ).json( mensajeServer );
    })
    .catch( ( respServer ) => {
      console.log( respServer );
      resp.status( HttpStatus.FORBIDDEN ).json( {error:true, message:'Error creando mensaje'} );
    });
  }

  @Get()
  findAll( @Res() resp /*@Query() query: ListAllEntities */) {
    //return `This action returns all cats (limit: ${query.limit} items)`;
    this.mensajeService.getAll()
    .then( (mensajesServer) => {
      resp.status( HttpStatus.OK ).json( mensajesServer );
    })
    .catch( () => {
      resp.status( HttpStatus.FORBIDDEN ).json( {error:true, message:'Error consultando los mensajes'} );
    });
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }*/

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMensajeDto: CreateMensajeDto, @Res() resp ) {
    console.log(`Editara ID = ${id}`);
    this.mensajeService.updateMensaje( id, updateMensajeDto )
    .then( (mensajeServer) => {
      resp.status( HttpStatus.OK ).json( mensajeServer );
    })
    .catch( ( resServer ) => {
      console.log('Actualizando mensaje.......');
      console.log( resServer );
      resp.status( HttpStatus.FORBIDDEN ).json( {error:true, message:'Error actualizando el mensaje'} );
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() resp ) {
    this.mensajeService.deleteMensaje( id )
    .then( ( resServer ) => {
      console.log('Borrando mensaje.......');
      console.log( resServer );
      resp.status( HttpStatus.OK ).json( {error:false, message:`Se ha borrado el mensaje con ID= ${id} `} );
    })
    .catch( () => {
      resp.status( HttpStatus.FORBIDDEN ).json( {error:true, message:`Error borrado el mensaje con ID= ${id} `} );
    });
  }
}
