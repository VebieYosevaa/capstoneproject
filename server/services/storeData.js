const firestore = require('../db');

const storeData = async (id, data) => {
    const docRef = firestore.collection('recommendations').doc(id);
    await docRef.set(data);
};

module.exports = storeData;
