export interface IRepository<TEntity> {
  findAll(): Promise<TEntity[]>;
  findById(id: number): Promise<TEntity>;
  create(item: TEntity): Promise<TEntity>;
  update(id: number, item: TEntity): Promise<TEntity>;
  delete(id: number): Promise<TEntity>;
}
