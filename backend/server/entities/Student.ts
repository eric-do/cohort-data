import { Entity, Enum, OneToOne, Property, Unique, ManyToMany, Collection } from "@mikro-orm/core";
import { BaseEntity, Cohort } from ".";

@Entity()
export class Student extends BaseEntity {

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  @Unique()
  email!: string;

  @ManyToMany(() => Cohort, cohort => cohort.students)
  cohorts = new Collection<Cohort>(this);
}