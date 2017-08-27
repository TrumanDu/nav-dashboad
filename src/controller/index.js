const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        let model = this.model('index');
        let data = await model.select();
        //data returns [{name: 'thinkjs', email: 'admin@thinkjs.org'}, ...]
        //return this.json(data);
        this.assign('indexs', data); //给模板赋值
        return this.display();
    }

    /**
     * add
     * @returns {Promise.<*>}
     */
    async addAction() {
        let name = this.post('name');
        let model = this.model('index');
        let id = await model.add({
            name: name,
            pid: 0
        });
        this.body = "add success！ID:" + id;
        if (id) {
            return this.success("add success!");
        } else {
            return this.fail(1000, "add fail!");
        }
        this.body = "add success！ID:" + id;
    }

    /**
     * delete
     * @returns {Promise.<void>}
     */
    async deleteAction(){
        let id = this.get('id');
        let model = this.model('index');
        let result = await model.where({id:['=',id]}).delete();
    }

    async listAction(){
        let model = this.model('index');
        let data = await model.select();
        //data returns [{name: 'thinkjs', email: 'admin@thinkjs.org'}, ...]
        return this.json(data);
    }
};
