const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        let model = this.model('index');
        let data = await model.select();
        this.assign('indexs', data); //给模板赋值
        return this.display();
    }

    async searchAction() {
        let searchName = this.post('searchName');
        let model = this.model('index');
        if (!think.isTrueEmpty(searchName)) {
            let data = await model.where({name: ['like', '%' + searchName + '%']}).select();
            if (!think.isTrueEmpty(data)) {
                let searchData = null;
                if (data.length == 0) {
                    searchData = await model.where({id: data.id}).select();
                } else {
                    let ids = "";
                    data.forEach(function (info) {
                        if (think.isTrueEmpty(ids)) {
                            ids = info.pid + "," + info.id;
                        } else {
                            ids = ids + "," + info.pid + "," + info.id;
                        }
                    });
                    console.log(ids);
                    searchData = await model.where({id: ['IN', ids]}).select();
                }
                this.assign('indexs', searchData); //给模板赋值
            }
        } else {
            let data = await model.select();
            this.assign('indexs', data); //给模板赋值
        }
        this.assign('searchName', searchName); //给模板赋值
        return this.display("index_index");

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
     * add
     * @returns {Promise.<*>}
     */
    async subclassAddAction() {
        let name = this.post('sname');
        let url = this.post('url');
        let pid = this.post('pid');
        let level = this.post('level');

        let model = this.model('index');
        let id = await model.add({
            name: name,
            url: url,
            level: level,
            pid: pid
        });
        this.body = "add success！ID:" + id;
        if (id) {
            return this.success(id, "add success!");
        } else {
            return this.fail(1000, "add fail!");
        }
        this.body = "add success！ID:" + id;
    }

    /**
     * delete
     * @returns {Promise.<void>}
     */
    async deleteAction() {
        let id = this.get('id');
        let model = this.model('index');
        let result = await model.where({id: ['=', id]}).delete();
    }

    async listAction() {
        let model = this.model('index');
        let data = await model.select();
        //data returns [{name: 'thinkjs', email: 'admin@thinkjs.org'}, ...]
        return this.json(data);
    }
};
