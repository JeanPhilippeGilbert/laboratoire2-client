import Model from './model.js';

export default class Math extends Model {
    constructor() {
        super();

        this.addField('op', 'string');
        this.addField('x', 'string');
        this.addField('y', 'string');
    }
}