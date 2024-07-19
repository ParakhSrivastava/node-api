import prisma from "../db";

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    
    res.json({
        data: products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates]
        }, []),
    });
}

// get one
export const getUpdate = async (req, res) => {
    const id = req.params.id;

    const update = await prisma.update.findUnique({
        where: {
            id,
        }
    });

    res.json({
        data: update,
    })
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if(!product) {
        return res.json({
            message: 'nope'
        })
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {
                connect: {
                    id: product.id
                }
            }
        }
    });

    res.json({
        data: update,
    })
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        return res.json({
            message: 'nope',
        })
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({
        data: updatedUpdate
    })
}

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        return res.json({
            message: 'nope',
        })
    }

    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({
        data: deletedUpdate
    })
}