const {Schema, model } = require('mongoose');


const widgetSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        
        description: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        }, 
        thumbnail: {
            type: String,
            require: true,
            trim: true,
        }
    }
)

const Widget = model('Widget', widgetSchema);

module.exports = Widget;