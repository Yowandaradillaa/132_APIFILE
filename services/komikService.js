async function createKomik(database, komikData) {
    const {title, description, author, imageType, ImageName, imageData} = komikData;

    if (!title || !description || !author) {
        throw new Error('Title, description, dan author wajib diisi');
    
}

const newKomik = await database.models.Komik.create({
    title,
    description,
    author,
    imageType : imageType || null,
    imageName : ImageName || null,
    imageData : imageData || null
});

return newKomik;
}

async function getAllKomik(database, komikId) {
    const komiks = await database.models.Komik.findAll();

    return komiks.map(k => {
        if (k.imageData) {
            k.imageData = k.imageData.toString('base64');
        }
        return k;
    });
}

async function getKomikById(database, id) {
    const komik = await database.models.Komik.findByPk(id);

    if (!komik) {
        throw new Error('Komik tidak ditemukan');
    }

    if (komik.imageData) {
        komik.imageData = komik.imageData.toString('base64');
    }

    return komik;
}


async function updateKomik(database, id, komikData) {
    const komik = await database.models.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }

    await komik.update(komikData);
    return komik;
}

async function deleteKomik(database, id) {
    const komik = await database.models.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }
    await komik.destroy();
    return { message: `Komik dengan ID ${id} telah dihapus` };
}   

module.exports = {
    createKomik,
    getAllKomik,
    getKomikById,
    updateKomik,
    deleteKomik
};  