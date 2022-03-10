import { Entity, Enum, Index, Property, Unique, OneToMany, Collection } from "@mikro-orm/core";
import { BaseEntity, Cohort } from ".";

@Entity()
export class Staff extends BaseEntity {

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  preferredName?: string;

  @Property()
  @Unique()
  email!: string;

  @Enum(() => StaffRole)
  role!: StaffRole;

  @OneToMany(() => Cohort, cohort => cohort.cohortLead)
  cohortsCL = new Collection<Cohort>(this);

  @OneToMany(() => Cohort, cohort => cohort.techMentor)
  cohortsTM = new Collection<Cohort>(this);
}

export enum StaffRole {
  PROGRAM_LEAD = 'program lead',
  COHORT_LEAD = 'cohort lead',
  TECH_MENTOR = 'tech mentor',
  SHEPHERD = 'shepherd',
  COORDINATOR = 'coordinator'
}