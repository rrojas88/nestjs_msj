import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({ name: 'mensajes' })
export class Mensaje {

  @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    nick: string;

    @Column("text")
    mensaje: string;

    @Column("timestamptz")
    createat: string;
}
