import { IRepository } from './repository.interface';

export class LocalDbService<TEntity> implements IRepository<TEntity> {
  private table: string;
  constructor(tableName: string) {
    this.table = tableName;
  }
  private async findAsObj(): Promise<TEntity[]> {
    return new Promise((resolve, reject) => {
      const data = localStorage.getItem(this.table);
      if (data) {
        const dataAsObj = JSON.parse(data);
        resolve(dataAsObj);
      } else {
        reject(null);
      }
    });
  }
  async findAll(): Promise<TEntity[]> {
    return new Promise((resolve, reject) => {
      const data = localStorage.getItem(this.table);
      if (!data) {
        resolve([]);
      } else {
        const dataAsObj = JSON.parse(data);
        let items: TEntity[] = [];
        Object.keys(dataAsObj).forEach((id) => {
          items.push(dataAsObj[id]);
        });
        resolve(items);
      }
    });
  }
  async findById(id: number): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      this.findAsObj()
        .then((data) => {
          const item = data[id];
          if (item) {
            resolve({ ...item });
          } else {
            reject(new Error('Item not found'));
          }
        })
        .catch((err) => {
          reject(new Error('Item not found'));
        });
    });
  }
  async create(item: TEntity): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      const data = localStorage.getItem(this.table);
      if (data) {
        let dataAsObj = JSON.parse(data);
        const id = Object.keys(dataAsObj).length + 1;
        if (dataAsObj[id]) {
          reject(new Error('Item already exists'));
        }
        dataAsObj[id] = { ...item, id: id };
        localStorage.setItem(this.table, JSON.stringify(dataAsObj));
        resolve({
          id,
          ...item,
        });
      } else {
        const firstItem = {
          1: { ...item, id: 1 },
        };
        localStorage.setItem(this.table, JSON.stringify(firstItem));
        resolve({ ...item, id: 1 });
      }
    });
  }
  async update(id: number, item: TEntity): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      this.findAsObj()
        .then((data) => {
          const existItem = data[id];
          if (existItem) {
            data[id] = { ...item, id };
            localStorage.setItem(this.table, JSON.stringify(data));
            resolve({ ...item, id });
          } else {
            reject(new Error('Item not found'));
          }
        })
        .catch((err) => {
          reject(new Error('Item not found'));
        });
    });
  }
  async delete(id: number): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      this.findAsObj()
        .then((data) => {
          const deletedItem = data[id];
          delete data[id];
          localStorage.setItem(this.table, JSON.stringify(data));
          if (deletedItem) {
            resolve({ ...deletedItem });
          } else {
            reject(new Error('Item not found'));
          }
        })
        .catch((err) => {
          reject(new Error('Item not found'));
        });
    });
  }
}
