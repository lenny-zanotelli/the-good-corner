import { 
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinTable, 
  ManyToMany, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Category } from "./category.entity";
import { Tag } from "./tag.entity";
import { IsDate, IsInt, Length, Min } from "class-validator";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Ad extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(3, 20)
  title: string;

  @Field(() => Number)
  @Column()
  @IsInt()
  @Min(0)
  price: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  owner: string;
  
  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  // One Ad has only 1 category
  // A category can contain multiple ads
  // ManyToOne relationship (many adds one category)
  @Field(() => Category, { nullable: true})
  @ManyToOne(() => Category, (category) => category.ads, {
    onDelete: "SET NULL"
  }) 
  category: Category;

   // An ad can have multiple tags
  // A tag can have multiple ads
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @Field(() => [Tag], { nullable: true })
  tags: Tag[];

  // An ad can have ONLY one owner
  // A user can have MULTIPLE ads

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.ads)
  user: User;
}