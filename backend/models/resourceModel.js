import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        type: { type: String, enum: ['Video', 'PDF'], required: true },
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        fileSize: { type: Number },
    },
    { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;