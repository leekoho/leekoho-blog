/**
 * Created by leekoho on 2018/1/12.
 */
require("babel-core/register")({
  presets: ['env', 'stage-2']
});

module.exports = require('./app.js');
