import { PostInterface } from 'interfaces/post';
import { AdminInterface } from 'interfaces/admin';
import { GetQueryInterface } from 'interfaces';

export interface TopicInterface {
  id?: string;
  title: string;
  date: any;
  admin_id?: string;
  created_at?: any;
  updated_at?: any;
  post?: PostInterface[];
  admin?: AdminInterface;
  _count?: {
    post?: number;
  };
}

export interface TopicGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  admin_id?: string;
}
