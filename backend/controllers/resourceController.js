import Resource from '../models/resourceModel.js';
import cloudinary from "../config/cloudinary.js";
import asyncHandler from 'express-async-handler';
import fs from 'fs';



export const getResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find({});
    res.json({ resources });
});

export const createResource = asyncHandler(async (req, res) => {
    const { title, description, type, link } = req.body;
    let fileData = {};

    if (req.file) {
        const uploaded = await cloudinary.uploader.upload(req.file.path, {
            resource_type: type === "PDF" ? "raw" : "auto",
            folder: "tech-resources",
        });


        fileData = {
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
            fileSize: req.file.size,
        };

        fs.unlinkSync(req.file.path); // Clean up temp file
    } else if (link) {
        fileData = { url: link, public_id: "external_link", fileSize: 0 };
    } else {
        res.status(400);
        throw new Error("No file or link provided");
    }

    const resource = await Resource.create({
        title,
        description,
        type,
        ...fileData,
    });

    res.status(201).json(resource);
});

export const deleteResource = asyncHandler(async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            res.status(404);
            throw new Error("Resource not found");
        }

        // Only attempt to delete from Cloudinary if it's not an external link
        if (resource.public_id && resource.public_id !== "external_link") {
            try {
                await cloudinary.uploader.destroy(resource.public_id, {
                    resource_type: resource.type === "PDF" ? "raw" : "video",
                });
            } catch (cloudinaryError) {
                console.error("Cloudinary deletion error:", cloudinaryError);
                // Continue with database deletion even if Cloudinary fails
            }
        }

        await Resource.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Delete resource error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting resource",
            error: error.message
        });
    }
});

export const getResourceById = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
        res.json(resource);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

export const updateResource = asyncHandler(async (req, res) => {
    // Optional - can be added if needed
});
