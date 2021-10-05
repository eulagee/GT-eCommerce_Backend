const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
            try {
                const data = await Category.findByPk(req.params.id, {
                    include: [{ model: Product }],
                });
                if (!data) {
                    res.status(404).json({ response: '[CATEGORY] WITH THAT [ID] NOT FOUND' })
                    return;
                };
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json(err)
            });

        router.post('/', (req, res) => {
            try {
                const data = await Category.create(req.body);
                res.status(200).json(data);
            } catch (err) {
                res.status(400).json(err);
            };
        });

        router.put('/:id', (req, res) => {
            try {
                const data = await Category.update(req.body, {
                    where: {
                        id: req.params.id,
                    },
                });
                if (!data[0]) {
                    res.status(404).json({ response: '[CATEGORY] WITH THAT [ID] NOT FOUND' });
                    return;
                };
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json(err);
            };
        });

        router.delete('/:id', (req, res) => {
            try {
                const data = await Category.destroy({
                    where: {
                        id: req.params.id,
                    },
                });
                if (!data) {
                    res.status(404).json({ response: '[CATEGORY] WITH THAT [ID] NOT FOUND' });
                    return;
                };
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json(err);
            };
        });

        module.exports = router;