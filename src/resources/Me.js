import Resource from '../ClassyResource';

class Me extends Resource {
  constructor(Classy) {
    super(Classy);
    
    this.path = 'me';

    this.retrieve = this.createMethod({
      method: "GET",
      path: '/me'
    });    
  }
}

export default Me;