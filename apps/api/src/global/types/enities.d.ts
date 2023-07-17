import { RepositoryMetaProperties } from '@global/types/repository';

interface ContructorProps<
  T extends RepositoryMetaProperties & Record<string, any>,
> extends Omit<T, keyof RepositoryMetaProperties> {
  id?: string;
  updatedAt?: string;
  createdAt?: string;
}
