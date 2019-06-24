const demo = require('../mock/36kr');

module.exports = {
  detail: async (ctx) => {
    const { id } = ctx.query;
    const data = await demo.fetchDetail(id);
    ctx.body = { data };
    ctx.type = 'json';
  },
};
