{"filter":false,"title":"user.js","tooltip":"/models/user.js","undoManager":{"mark":23,"position":23,"stack":[[{"start":{"row":0,"column":0},"end":{"row":14,"column":50},"action":"insert","lines":["var mongoose = require('mongoose');","var Schema = mongoose.Schema;","","var artSchema = new Schema({","    beaconId: String,","    name: String,","    arthor: String,","    desc: String,","    img_art: String,","    img_arthor: String,","    like_count: Number,","    update_date: {type: Date, defalut: Date.now }","});","","module.exports = mongoose.model('art', artSchema);"],"id":1}],[{"start":{"row":4,"column":4},"end":{"row":4,"column":12},"action":"remove","lines":["beaconId"],"id":2},{"start":{"row":4,"column":4},"end":{"row":4,"column":5},"action":"insert","lines":["s"]}],[{"start":{"row":4,"column":5},"end":{"row":4,"column":6},"action":"insert","lines":["c"],"id":3},{"start":{"row":4,"column":6},"end":{"row":4,"column":7},"action":"insert","lines":["o"]}],[{"start":{"row":4,"column":7},"end":{"row":4,"column":8},"action":"insert","lines":["r"],"id":4}],[{"start":{"row":4,"column":8},"end":{"row":4,"column":9},"action":"insert","lines":["e"],"id":5}],[{"start":{"row":4,"column":11},"end":{"row":4,"column":17},"action":"remove","lines":["String"],"id":6},{"start":{"row":4,"column":11},"end":{"row":4,"column":12},"action":"insert","lines":["N"]}],[{"start":{"row":4,"column":12},"end":{"row":4,"column":13},"action":"insert","lines":["u"],"id":7}],[{"start":{"row":4,"column":13},"end":{"row":4,"column":14},"action":"insert","lines":["m"],"id":8}],[{"start":{"row":4,"column":14},"end":{"row":4,"column":15},"action":"insert","lines":["b"],"id":9}],[{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"insert","lines":["e"],"id":10}],[{"start":{"row":4,"column":16},"end":{"row":4,"column":17},"action":"insert","lines":["r"],"id":11}],[{"start":{"row":5,"column":17},"end":{"row":10,"column":23},"action":"remove","lines":["","    arthor: String,","    desc: String,","    img_art: String,","    img_arthor: String,","    like_count: Number,"],"id":12}],[{"start":{"row":9,"column":33},"end":{"row":9,"column":36},"action":"remove","lines":["art"],"id":17},{"start":{"row":9,"column":33},"end":{"row":9,"column":34},"action":"insert","lines":["u"]}],[{"start":{"row":9,"column":34},"end":{"row":9,"column":35},"action":"insert","lines":["s"],"id":18}],[{"start":{"row":9,"column":35},"end":{"row":9,"column":36},"action":"insert","lines":["e"],"id":19}],[{"start":{"row":9,"column":36},"end":{"row":9,"column":37},"action":"insert","lines":["r"],"id":20}],[{"start":{"row":9,"column":42},"end":{"row":9,"column":43},"action":"remove","lines":["t"],"id":21}],[{"start":{"row":9,"column":41},"end":{"row":9,"column":42},"action":"remove","lines":["r"],"id":22}],[{"start":{"row":9,"column":40},"end":{"row":9,"column":41},"action":"remove","lines":["a"],"id":23}],[{"start":{"row":9,"column":40},"end":{"row":9,"column":41},"action":"insert","lines":["u"],"id":24}],[{"start":{"row":9,"column":41},"end":{"row":9,"column":42},"action":"insert","lines":["s"],"id":25}],[{"start":{"row":9,"column":42},"end":{"row":9,"column":43},"action":"insert","lines":["e"],"id":26}],[{"start":{"row":9,"column":43},"end":{"row":9,"column":44},"action":"insert","lines":["r"],"id":27}],[{"start":{"row":3,"column":4},"end":{"row":3,"column":13},"action":"remove","lines":["artSchema"],"id":28},{"start":{"row":3,"column":4},"end":{"row":3,"column":14},"action":"insert","lines":["userSchema"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":52},"end":{"row":9,"column":52},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":202,"mode":"ace/mode/javascript"}},"timestamp":1475842098617,"hash":"e3d0c3e0bfe8800cff7260f4b32ec729c0582b55"}