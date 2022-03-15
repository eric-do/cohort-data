import { Entity, Property, PrimaryKey, ManyToOne, ManyToMany, Collection } from "@mikro-orm/core";
import { BaseEntity, Staff, Student } from ".";

interface ICohort {
  code: string;
  cohortLead?: Staff;
  techMentor?: Staff;
  startDate?: Date;
  endDate?: Date;
}

@Entity()
export class Cohort {

  @PrimaryKey()
  code!: string;

  @ManyToOne(() => Staff, { nullable: true, default: null })
  cohortLead?: Staff;

  @ManyToOne(() => Staff, { nullable: true, default: null })
  techMentor?: Staff;

  @ManyToMany(() => Student)
  students = new Collection<Student>(this);

  @Property({ nullable: true})
  startDate?: Date;

  @Property({ nullable: true})
  endDate?: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor({
    code,
    cohortLead,
    techMentor
  }: ICohort) {
    this.code = code;
    this.cohortLead = cohortLead;
    this.techMentor = techMentor;
  }
}