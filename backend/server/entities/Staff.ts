import { Entity, Enum, Index, Property, Unique, OneToMany, Collection } from "@mikro-orm/core";
import { BaseEntity, Cohort } from ".";

interface IStaff {
  firstName: string;
  lastName: string;
  email: string;
  preferredName: string;
  role: StaffRole;
  github: string | undefined;
}

@Entity()
export class Staff extends BaseEntity {

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  @Unique()
  github?: string;

  @Enum(() => StaffRole)
  role!: StaffRole;

  @OneToMany(() => Cohort, cohort => cohort.cohortLead)
  cohortsCL = new Collection<Cohort>(this);

  @OneToMany(() => Cohort, cohort => cohort.techMentor)
  cohortsTM = new Collection<Cohort>(this);

  constructor({
    firstName,
    lastName,
    email,
    role,
    github
  }: IStaff) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.github = github;
  }
}

export enum StaffRole {
  PROGRAM_LEAD = 'program lead',
  COHORT_LEAD = 'cohort lead',
  TECH_MENTOR = 'tech mentor',
  SHEPHERD = 'shepherd',
  COORDINATOR = 'coordinator'
}