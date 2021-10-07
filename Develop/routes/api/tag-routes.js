const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const data = await Tag.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/:id', async(req, res) => {
        // find one tag by its `id` value
        // be sure to include its associated Products
        try {
            const data = await Tag.findByPk(req.params.id, {
                include: [{ model: Product }],
            });
            if (!data) {
                res.status(404).json({ message: 'No tag with this ID' });
            }
            res.status(200).json(data);
            return;

        }
        catch (err) {
            res.status(500).json(err)
        };
});

router.post('/', async(req, res) => {
    // create a new category
    try {
        const data = await Tag.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.put('/:id', async(req, res) => {
    // update a tag by its `id` value
    try {
        const data = await Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!data[0]) {
            res.status(404).json({ message: 'No category with this ID' });
            return;
        };
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/:id', async(req, res) => {
    // delete a tag by its `id` value
    try {
        const data = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!data) {
            res.status(404).json({ message: 'No category with this ID' });
            return;
        };
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    };
});


module.exports = router;