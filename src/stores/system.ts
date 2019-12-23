import { observable, action } from 'mobx';

class System {
  @observable logs: string[] = [];

  @action
  log(message: string) {
    this.logs.push(`${message}`);
    this.logs = this.logs.slice(-100);
  }
}

export default new System();
