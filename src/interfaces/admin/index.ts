import { TopicInterface } from 'interfaces/topic';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AdminInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  topic?: TopicInterface[];
  user?: UserInterface;
  _count?: {
    topic?: number;
  };
}

export interface AdminGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
