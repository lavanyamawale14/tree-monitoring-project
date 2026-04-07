const mongoose = require('mongoose');

const growthRecordSchema = new mongoose.Schema({
    date: { type: String, required: true },
    height: { type: Number, required: true }
}, { _id: false });

const treeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    height: { type: Number, required: true },
    healthStatus: { 
        type: String, 
        enum: ["Healthy", "Moderate", "Needs Attention"],
        required: true 
    },
    datePlanted: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    growthHistory: [growthRecordSchema],
    imageUrl: { type: String }
}, { timestamps: true });


// 🌿 CO2 Calculation
treeSchema.virtual("co2Absorbed").get(function () {
    return (this.height * 1.5).toFixed(2);
});

// 🌿 Oxygen Calculation
treeSchema.virtual("oxygenProduced").get(function () {
    return (this.height * 1.0).toFixed(2);
});


// Fix id for frontend
treeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Tree', treeSchema);