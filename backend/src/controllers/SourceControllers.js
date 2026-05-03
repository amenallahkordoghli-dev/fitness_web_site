import Source from '../models/source.js';

export const createSource = async (req, res) => {
    try {
        const { title, category, description, link } = req.body;

        const source = await Source.create({
            title,
            category,
            description,
            link
        });

        res.status(201).json({
            message: "source ajoutée avec succès",
            source
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllSources = async (req, res) => {
    try {
        const sources = await Source.findAll();

        res.status(200).json({ sources });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};