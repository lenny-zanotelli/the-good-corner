/* eslint-disable import/no-cycle */
import Category from './category';
import Tag from './tag';

export interface Ad {
  id: string;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category: Category;
  tags: Tag[];
}
