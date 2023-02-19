const {db} = require('../firebase') ;
const { collection, addDoc } = require('firebase/firestore') ;
const dayjs = require('dayjs') ;


/**
 * 
 * @param {string} productId 
 * @param {number} price 
 */
 
async function savePrice(productId, price) {

    const collectionRef = collection(db,'products', productId, 'history');
    await addDoc(collectionRef, {
        price: price,
        date: dayjs(Date()).format('YYYY-MM-DD')
    });
    
}

exports.savePrice = savePrice;