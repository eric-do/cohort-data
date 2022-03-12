import { Entity, Enum, OneToOne, Property, Unique, ManyToMany, Collection } from "@mikro-orm/core";
import { BaseEntity, Cohort } from ".";

interface IStudent {
  firstName: string;
  lastName: string;
  email: string;
  preferredName: string;
  github: string | undefined;
  cohort: string;
}

@Entity()
export class Student extends BaseEntity {

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  preferredName?: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  @Unique()
  github?: string;

  @ManyToMany(() => Cohort, cohort => cohort.students)
  cohorts = new Collection<Cohort>(this);

  constructor({
    firstName,
    lastName,
    email,
    preferredName = firstName,
    github = undefined,
    cohort
  }: IStudent) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.preferredName = preferredName;
    this.github = github;
  }
}