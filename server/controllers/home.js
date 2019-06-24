const demo = require('../mock/36kr');

module.exports = {
  flash: async (ctx) => {
    const { id, page } = ctx.query;
    const homeData = await demo.fetchFlash(id, page || 10);
    ctx.body = homeData.data;
    ctx.type = 'json';
  },
  column: async (ctx) => {
    const { page } = ctx.query;
    const data = await demo.fetchColumn(page || 1);
    ctx.body = data.data;
    ctx.type = 'json';
  },
};
