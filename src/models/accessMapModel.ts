import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const accessMapSchema = new Schema({
    groups: [Schema.Types.ObjectId],
    key: String,
    value: {
        componentName: String,
        matchData: {
            path: String,
            url: String,
            isExact: Boolean,
            params: {},
        },
        visibleForAll: Boolean
    },
    type: String,
    parent: String,
    route: String,
})

accessMapSchema.statics.setMap = async function (accessMap) {
    // const result = await accessMap.map((accessPoint:any, index:number) => this.findByIdAndUpdate({_id: accessPoint._id}, {accessPoint}, {$upsert: true}))
}