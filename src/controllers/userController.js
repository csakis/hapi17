const Services = require("../services");

class UserController {
  constructor() {
    this.get = this.get.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.service = new Services.UserService();
  }

  async get({ query }, h) {
    try {
      const { skip, limit } = query;
      const users = await this.service.getAllUsers({}, {}, { skip, limit });
      return users;
    } catch (err) {
      return h.internalError(err);
    }
  }

  async getProfile({ auth }, h) {
    try {
      return {
        profile: await this.service.getUserById(auth.artifacts.id, { email: 1, name: 1, _id: 1 }),
      };
    } catch (err) {
      return h.internalError(err);
    }
  }
}


module.exports = UserController;

