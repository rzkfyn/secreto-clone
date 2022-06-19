import User from '../models/User.js';
import Message from '../models/Message.js';
import Comment from '../models/Comment.js';

class Controller {
  private static models = [User, Message, Comment];

  protected static model(name: string) {
    let model: User | Message | Comment | undefined;
    Controller.models.forEach((Model) => {
      const modelName = Model.toString().split(' ')[1].replace('{}', '').toLowerCase();
      if (modelName === name.toLowerCase()) model = new Model();
    });
    return model;
  }
}

export default Controller;
